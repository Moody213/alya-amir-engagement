import { EVENT } from "./config";

function toUtcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildDates() {
  const start = new Date(`${EVENT.date}T${EVENT.startTime}:00`);
  const end = new Date(`${EVENT.date}T${EVENT.endTime}:00`);
  return { start, end };
}

const EVENT_TITLE = `${EVENT.coupleShortName} — ${EVENT.eventType}`;
const EVENT_DESCRIPTION =
  "Join us as we celebrate our engagement. Details and RSVP at the invitation link.";

export function getGoogleCalendarUrl(): string {
  const { start, end } = buildDates();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: EVENT_DESCRIPTION,
    location: EVENT.venueName,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsFile(): string {
  const { start, end } = buildDates();
  const now = toUtcStamp(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Alya & Amir//Engagement Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:alya-amir-engagement-${start.getTime()}@invitation`,
    `DTSTAMP:${now}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${EVENT_TITLE}`,
    `DESCRIPTION:${EVENT_DESCRIPTION}`,
    `LOCATION:${EVENT.venueName}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcsFile() {
  const blob = new Blob([buildIcsFile()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "alya-amir-engagement.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
