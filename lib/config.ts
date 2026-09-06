/**
 * CENTRAL CONFIGURATION
 * ---------------------
 * Every piece of content that is likely to change lives here.
 * Update names, dates, venue, schedule, wording, theme colors, and
 * integration URLs in this single file.
 */

export const EVENT = {
  brideName: "Alya",
  groomName: "Amir",
  coupleShortName: "Amir & Alya",
  eventType: "Engagement",

  /** ISO date of the event (used by the countdown & calendar). */
  date: "2026-11-19",

  /**
   * EDITABLE: exact start/end time have not been confirmed yet.
   * Using a sensible placeholder (6:00 PM – 10:00 PM) so the countdown
   * and "Add to Calendar" feature work today. Update the moment the
   * family confirms the real timing.
   */
  startTime: "18:00",
  endTime: "22:00",
  /** IANA timezone used to interpret startTime/endTime above. */
  timeZone: "Asia/Karachi",

  dateDisplay: {
    weekday: "Thursday",
    day: "19",
    month: "Nov",
    year: "2026",
  },

  /** EDITABLE: replace with the real venue name once confirmed. */
  venueName: "AZHA NEW CAIRO",
  /** EDITABLE: replace with the real venue address once confirmed. */
  //venueAddress: "Address to be announced",
  mapsUrl: "https://maps.app.goo.gl/Njx8Eufth3hmWqjs6?g_st=ic",

  invitationLines: [
    "Together with their families,",
    "Amir & Alya",
    "request the pleasure of your company",
    "as they celebrate their engagement.",
  ],
} as const;

export type ScheduleItem = {
  id: string;
  title: string;
  time: string;
  description?: string;
};

/**
 * EDITABLE: exact timings have not been provided. Update the `time`
 * field on each item once the family confirms the run of show.
 */
export const SCHEDULE: ScheduleItem[] = [
  {
    id: "welcome",
    title: "Guest Arrival",
    time: "Time to be announced",
    description: "Arrive, settle in, and share in the excitement of the evening.",
  },
  {
    id: "ceremony",
    title: "Engagement Ceremony",
    time: "Time to be announced",
    description: "The exchange of rings, celebrated in the presence of family and friends.",
  },
  {
    id: "dinner",
    title: "Dinner",
    time: "Time to be announced",
    description: "An evening of delicious cuisine and heartfelt conversation.",
  },
  {
    id: "farewell",
    title: "End of Celebration",
    time: "Time to be announced",
    description: "With hearts full of gratitude, we bid farewell to a beautiful evening.",
  },
];

/**
 * OUR STORY — placeholder only.
 * EDITABLE: replace `paragraphs` and `photo` once content is ready.
 * No real details have been invented here on purpose.
 */
export const OUR_STORY = {
  heading: "Our Story",
  paragraphs: ["Our story begins here — check back soon."],
  photo: null as null | { src: string; alt: string },
};

export const THEME = {
  colors: {
    background: "#ECE3D6",
    backgroundAlt: "#F5EFE6",
    ink: "#1B1917",
    gold: "#A6963C",
    goldMuted: "#B9AE86",
    line: "#8E8A82",
    textMuted: "#6F6A63",
    cream: "#FBF8F2",
  },
  fonts: {
    script: "var(--font-script)",
    serif: "var(--font-serif)",
    display: "var(--font-display)",
  },
} as const;

export const RSVP_CONFIG = {
  /**
   * EDITABLE: paste the Google Apps Script Web App URL here after
   * deploying scripts/google-apps-script.js. See README.md for the
   * full step-by-step deployment guide.
   */
  appsScriptUrl: process.env.NEXT_PUBLIC_RSVP_APPS_SCRIPT_URL ?? "",
} as const;

/**
 * ADMIN DASHBOARD
 * EDITABLE: this is a lightweight client-side gate, not real
 * authentication. See README.md "Admin dashboard security" for the
 * limitations of this approach.
 */
export const ADMIN_CONFIG = {
  passcode: process.env.NEXT_PUBLIC_ADMIN_PASSCODE ?? "alya-amir-2026",
};
