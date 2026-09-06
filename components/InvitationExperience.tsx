"use client";

import { useState } from "react";
import { InvitationHero } from "@/components/InvitationHero";
import { NamesSection } from "@/components/NamesSection";
import { DateSection } from "@/components/DateSection";
import { InvitationMessage } from "@/components/InvitationMessage";
import { Countdown } from "@/components/Countdown";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { OurStory } from "@/components/OurStory";
import { VenueSection } from "@/components/VenueSection";
import { RSVPSection } from "@/components/RSVPSection";
import { Footer } from "@/components/Footer";
import { MusicControl } from "@/components/MusicControl";

export function InvitationExperience({
  guestName,
  guestToken,
}: {
  guestName?: string;
  guestToken?: string;
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <InvitationHero
        isOpened={isOpened}
        onOpen={() => setIsOpened(true)}
        guestName={guestName}
      />

      <main className="mx-auto max-w-2xl">
        <NamesSection guestName={guestName} />
        <div className="mx-auto hairline w-24" />
        <DateSection />
        <div className="mx-auto hairline w-24" />
        <InvitationMessage />
        <div className="mx-auto hairline w-24" />
        <Countdown />
        <div className="mx-auto hairline w-24" />
        <ScheduleTimeline />
        <div className="mx-auto hairline w-24" />
        <OurStory />
        <div className="mx-auto hairline w-24" />
        <VenueSection />
        <div className="mx-auto hairline w-24" />
        <RSVPSection defaultGuestName={guestName} guestToken={guestToken} />
        <Footer />
      </main>

      <MusicControl armed={isOpened} />
    </>
  );
}
