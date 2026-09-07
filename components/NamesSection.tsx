"use client";

import { EVENT } from "@/lib/config";
import { THEME } from "@/lib/theme";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export function NamesSection({ guestName }: { guestName?: string }) {
  const t = THEME.namesSection;
  return (
    <section
      className="relative z-10 flex flex-col items-center px-6 text-center"
      style={{ paddingTop: t.paddingTop, paddingBottom: t.paddingBottom }}
    >
      <Reveal>
        <p
          className="uppercase tracking-widest-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]"
          style={{ fontSize: t.eyebrow.fontSize, color: t.eyebrow.color }}
        >
          {guestName ? `Dear ${guestName},` : "Save the Date"}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <Ornament className="mx-auto mt-5 h-4 w-28 text-gold-muted" />
      </Reveal>

      <Reveal delay={0.15} y={24}>
        <h1
          className="mt-8 font-script leading-[0.95]"
          style={{ fontSize: t.names.fontSize, color: t.names.color }}
        >
          {EVENT.groomName}
        </h1>
      </Reveal>

      <Reveal delay={0.25}>
        <p
          className="my-3 font-script"
          style={{ fontSize: t.ampersand.fontSize, color: t.ampersand.color }}
        >
          &amp;
        </p>
      </Reveal>

      <Reveal delay={0.3} y={24}>
        <h1
          className="font-script leading-[0.95]"
          style={{ fontSize: t.names.fontSize, color: t.names.color }}
        >
          {EVENT.brideName}
        </h1>
      </Reveal>

      <Reveal delay={0.45}>
        <p
          className="mt-10 font-display uppercase text-gold bg-background-alt/65 px-4 py-2 rounded-4xl tracking-widest-2"
          style={{ fontSize: t.eventType.fontSize }}
        >
          {EVENT.eventType}
        </p>
      </Reveal>
    </section>
  );
}
