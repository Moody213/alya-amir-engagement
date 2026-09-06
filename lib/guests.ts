/**
 * PERSONALIZED GUEST LINKS
 * ------------------------
 * This map is only ever read on the server (inside the `/invite/[guest]`
 * server component). Only the single matched guest's display name is
 * ever sent to the browser — the full list below never reaches the
 * client bundle.
 *
 * EDITABLE: add one entry per personalized link you want to hand out.
 *   slug   -> what appears in the URL, e.g. /invite/ahmed
 *   name   -> the name shown in "Dear ___"
 *   token  -> stored with their RSVP so responses can be traced back
 *             to the link that was shared, without requiring login.
 */
export type Guest = {
  slug: string;
  guestName: string;
  token: string;
};

const GUEST_LIST: Guest[] = [
  // { slug: "ahmed", guestName: "Ahmed Mohamed", token: "ahmed-001" },
];

export function getGuestBySlug(slug: string): Guest | null {
  const normalized = slug.trim().toLowerCase();
  return GUEST_LIST.find((g) => g.slug.toLowerCase() === normalized) ?? null;
}
