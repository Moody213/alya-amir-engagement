import { notFound } from "next/navigation";
import { InvitationExperience } from "@/components/InvitationExperience";
import { getGuestBySlug } from "@/lib/guests";

/**
 * Personalized invitation link, e.g. /invite/ahmed
 *
 * The full guest list (lib/guests.ts) is only ever read here, on the
 * server. Only the matched guest's name and token are sent to the
 * browser as props — the rest of the list never reaches the client.
 */
export default async function InvitePage({
  params,
}: {
  params: Promise<{ guest: string }>;
}) {
  const { guest: slug } = await params;
  const guest = getGuestBySlug(slug);

  if (!guest) {
    notFound();
  }

  return (
    <InvitationExperience guestName={guest.guestName} guestToken={guest.token} />
  );
}
