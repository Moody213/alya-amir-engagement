import { EVENT } from "@/lib/config";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/Ornament";

export function InvitationMessage() {
  return (
    <section className="mx-auto max-w-md px-8 py-16 text-center">
      <Reveal>
        <SectionEyebrow>The Invitation</SectionEyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mx-auto mt-8 hairline w-16" />
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-8 font-display text-2xl italic leading-relaxed text-ink sm:text-[28px]">
          {EVENT.invitationLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <div className="mx-auto mt-8 hairline w-16" />
      </Reveal>
    </section>
  );
}
