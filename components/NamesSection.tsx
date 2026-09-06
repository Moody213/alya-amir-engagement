"use client";

import { EVENT } from "@/lib/config";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export function NamesSection({ guestName }: { guestName?: string }) {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 pb-16 pt-20 text-center">
      <Reveal>
        <p className="text-[11px] uppercase tracking-widest-2 text-cream [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">
          {guestName ? `Dear ${guestName},` : "Save the Date"}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <Ornament className="mx-auto mt-5 h-4 w-28 text-gold-muted" />
      </Reveal>

      <Reveal delay={0.15} y={24}>
        <h1 className="mt-8 font-script text-7xl leading-[0.95] text-ink sm:text-8xl">
          {EVENT.groomName}
        </h1>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="my-3 font-script text-3xl text-gold">&amp;</p>
      </Reveal>

      <Reveal delay={0.3} y={24}>
        <h1 className="font-script text-7xl leading-[0.95] text-ink sm:text-8xl">
          {EVENT.brideName}
        </h1>
      </Reveal>

      <Reveal delay={0.45}>
        <p className="mt-10 font-display text-sm uppercase tracking-widest-2 text-ink">
          {EVENT.eventType}
        </p>
      </Reveal>
    </section>
  );
}
