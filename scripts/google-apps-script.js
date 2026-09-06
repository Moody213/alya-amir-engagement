/**
 * ALYA & AMIR — RSVP BACKEND (Google Apps Script)
 * ------------------------------------------------
 * This script receives RSVP submissions from the invitation website
 * and appends them as rows in a Google Sheet. It also answers a
 * read-only "stats" request used by the admin dashboard.
 *
 * SETUP: see README.md, section "Google Sheets + Apps Script setup",
 * for the full step-by-step walkthrough (creating the sheet, pasting
 * this code, deploying, and wiring the URL into the frontend).
 *
 * Expected sheet columns (row 1, exact order):
 *   Timestamp | Guest Name | Attendance | Guest Token | Source
 */

const SHEET_NAME = "RSVPs";
const HEADERS = ["Timestamp", "Guest Name", "Attendance", "Guest Token", "Source"];
const MAX_NAME_LENGTH = 120;

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function sanitizeText_(value, maxLength) {
  if (typeof value !== "string") return "";
  // Strip control characters and cap length to prevent abuse.
  return value.replace(/[\r\n\t]/g, " ").trim().slice(0, maxLength);
}

/**
 * Handles RSVP submissions from the website.
 * POST body (text/plain, JSON-encoded): { guestName, attendance, guestToken?, source? }
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({ status: "error", message: "Missing request body." });
    }

    const data = JSON.parse(e.postData.contents);
    const guestName = sanitizeText_(data.guestName, MAX_NAME_LENGTH);
    const attendance = data.attendance === "YES" || data.attendance === "NO"
      ? data.attendance
      : null;
    const guestToken = sanitizeText_(data.guestToken || "", 60);
    const source = sanitizeText_(data.source || "direct-link", 60);

    if (!guestName) {
      return jsonResponse_({ status: "error", message: "Guest name is required." });
    }
    if (!attendance) {
      return jsonResponse_({ status: "error", message: "Attendance must be YES or NO." });
    }

    const sheet = getSheet_();
    sheet.appendRow([new Date(), guestName, attendance, guestToken, source]);

    return jsonResponse_({ status: "success" });
  } catch (err) {
    return jsonResponse_({ status: "error", message: "Unable to save RSVP." });
  }
}

/**
 * Handles read-only stats requests from the admin dashboard.
 * GET ?action=stats
 */
function doGet(e) {
  const action = e && e.parameter && e.parameter.action;

  if (action !== "stats") {
    return jsonResponse_({ status: "error", message: "Unknown action." });
  }

  try {
    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();
    const rows = values.slice(1); // drop header row

    let confirmed = 0;
    let declined = 0;
    const outputRows = [];

    rows.forEach((row) => {
      const [timestamp, guestName, attendance] = row;
      if (!guestName) return;
      if (attendance === "YES") confirmed += 1;
      if (attendance === "NO") declined += 1;
      outputRows.push({
        guestName: String(guestName),
        attendance: attendance === "YES" ? "YES" : "NO",
        timestamp: timestamp instanceof Date ? timestamp.toISOString() : String(timestamp),
      });
    });

    outputRows.reverse(); // most recent first

    return jsonResponse_({
      status: "success",
      confirmed: confirmed,
      declined: declined,
      total: confirmed + declined,
      rows: outputRows,
    });
  } catch (err) {
    return jsonResponse_({ status: "error", message: "Unable to load stats." });
  }
}
