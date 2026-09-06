import { RSVP_CONFIG } from "./config";

export type Attendance = "YES" | "NO";

export type RsvpPayload = {
  guestName: string;
  attendance: Attendance;
  guestToken?: string;
  source?: string;
};

export type RsvpResult = { ok: true } | { ok: false; message: string };

/**
 * Sends an RSVP to the Google Apps Script Web App configured in
 * lib/config.ts. Never throws — always resolves to a friendly result
 * so the UI can show a graceful message instead of a technical error.
 */
export async function submitRsvp(payload: RsvpPayload): Promise<RsvpResult> {
  if (!RSVP_CONFIG.appsScriptUrl) {
    return {
      ok: false,
      message: "RSVP is not connected yet. Please try again soon.",
    };
  }

  try {
    const response = await fetch(RSVP_CONFIG.appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, message: "Something went wrong. Please try again." };
    }

    const data = await response.json().catch(() => null);
    if (data && data.status === "error") {
      return { ok: false, message: "Something went wrong. Please try again." };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "We couldn't reach the server. Please check your connection and try again.",
    };
  }
}

export type RsvpStats = {
  confirmed: number;
  declined: number;
  total: number;
  rows: { guestName: string; attendance: Attendance; timestamp: string }[];
};

export async function fetchRsvpStats(): Promise<RsvpStats | null> {
  if (!RSVP_CONFIG.appsScriptUrl) return null;

  try {
    const response = await fetch(`${RSVP_CONFIG.appsScriptUrl}?action=stats`, {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data || data.status === "error") return null;
    return {
      confirmed: data.confirmed ?? 0,
      declined: data.declined ?? 0,
      total: data.total ?? 0,
      rows: data.rows ?? [],
    };
  } catch {
    return null;
  }
}
