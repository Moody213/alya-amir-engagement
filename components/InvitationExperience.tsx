"use client";

import { useState } from "react";
import { InvitationHero } from "@/components/InvitationHero";
import { BackgroundScene } from "@/components/BackgroundScene";
import { NamesSection } from "@/components/NamesSection";
import { DateSection } from "@/components/DateSection";
import { InvitationMessage } from "@/components/InvitationMessage";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { VenueSection } from "@/components/VenueSection";
import { OurStory } from "@/components/OurStory";
import { RSVPSection } from "@/components/RSVPSection";
import { Countdown } from "@/components/Countdown";
import { Footer } from "@/components/Footer";
import { MusicControl } from "@/components/MusicControl";

// Toggle to bring the "Our Story" section back without deleting it.
const SHOW_OUR_STORY = false;

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
        <div className="relative aspect-[1731/5450] w-full">
          <BackgroundScene />
          <NamesSection guestName={guestName} />
          <InvitationMessage />
          <DateSection />
        </div>

        {/* Its own background (a crop of the lower/parchment portion of the
            art) sized with `cover`, so it always fully covers this block no
            matter how tall the content gets on any screen — unlike a fixed
            aspect-ratio image, `cover` can't "run out" of art. */}
        <div
          className="relative z-10 bg-cover bg-top"
          style={{ backgroundImage: "url(/background-lower.webp)" }}
        >
          <ScheduleTimeline />
          <div className="mx-auto hairline w-24" />
          <RSVPSection defaultGuestName={guestName} guestToken={guestToken} />
          <div className="mx-auto hairline w-24" />
          <VenueSection />
          <div className="mx-auto hairline w-24" />
          <Countdown />
        </div>

        {SHOW_OUR_STORY && (
          <>
            <div className="mx-auto hairline w-24" />
            <OurStory />
          </>
        )}
        <Footer />
      </main>

      <MusicControl armed={isOpened} />
    </>
  );
}
