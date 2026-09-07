/**
 * VISUAL CONTROL PANEL
 * --------------------
 * Every section's font size, text color, and vertical position lives
 * here. Change a value below and refresh the browser — no need to dig
 * through component files.
 *
 * - fontSize: any valid CSS size ("28px", "1.75rem", "2vw", ...)
 * - color: any valid CSS color ("#1d1a17", "rgb(0 0 0)", "red", ...
 *   or one of the theme tokens already used across the site:
 *   var(--color-ink), var(--color-gold), var(--color-gold-muted),
 *   var(--color-cream), var(--color-text-muted))
 * - paddingTop / paddingBottom: vertical space above/below a section
 * - top / left (DateSection only): position over the background
 *   medallion, as a percentage of the background image's box
 */

export const THEME = {
  hero: {
    eyebrow: { fontSize: "11px", color: "var(--color-gold)" },
    names: { fontSize: "60px", color: "var(--color-ink)" },
    ampersand: { fontSize: "30px", color: "var(--color-gold)" },
    dateLine: { fontSize: "12px", color: "var(--color-text-muted)" },
  },

  namesSection: {
    paddingTop: "80px",
    paddingBottom: "16px",
    eyebrow: { fontSize: "11px", color: "var(--color-cream)" },
    names: { fontSize: "72px", color: "var(--color-ink)" },
    ampersand: { fontSize: "30px", color: "var(--color-gold)" },
    eventType: { fontSize: "14px", color: "var(--color-ink)" },
  },

  invitationMessage: {
    paddingTop: "0px",
    paddingBottom: "40px",
    text: { fontSize: "16px", color: "var(--color-ink)" },
  },

  dateSection: {
    top: "38%",
    left: "50%",
    weekday: { fontSize: "15px", color: "var(--color-ink)" },
    day: { fontSize: "34px", color: "var(--color-ink)" },
    year: { fontSize: "20px", color: "var(--color-ink)" },
  },

  scheduleTimeline: {
    paddingTop: "24px",
    paddingBottom: "64px",
    eyebrow: { fontSize: "11px", color: "var(--color-ink)" },
    heading: { fontSize: "30px", color: "var(--color-ink)" },
    itemTime: { fontSize: "11px", color: "var(--color-ink)" },
    itemTitle: { fontSize: "20px", color: "var(--color-ink)" },
    itemDescription: { fontSize: "14px", color: "var(--color-text-muted)" },
  },

  rsvpSection: {
    paddingTop: "112px",
    paddingBottom: "64px",
    eyebrow: { fontSize: "11px", color: "var(--color-ink)" },
    heading: { fontSize: "30px", color: "var(--color-ink)" },
    subtext: { fontSize: "14px", color: "var(--color-text-muted)" },
  },

  venueSection: {
    paddingTop: "64px",
    paddingBottom: "64px",
    eyebrow: { fontSize: "11px", color: "var(--color-ink)" },
    venueName: { fontSize: "24px", color: "var(--color-ink)" },
    venueAddress: { fontSize: "14px", color: "var(--color-text-muted)" },
  },

  countdown: {
    paddingTop: "64px",
    paddingBottom: "64px",
    eyebrow: { fontSize: "11px", color: "var(--color-ink)" },
    unitValue: { fontSize: "24px", color: "var(--color-ink)" },
    unitLabel: { fontSize: "9px", color: "var(--color-text-muted)" },
  },

  footer: {
    paddingTop: "24px",
    paddingBottom: "56px",
    names: { fontSize: "30px", color: "var(--color-ink)" },
    dateLine: { fontSize: "11px", color: "var(--color-text-muted)" },
    note: { fontSize: "12px", color: "var(--color-text-muted)" },
  },
} as const;
