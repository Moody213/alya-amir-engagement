import { EVENT } from "@/lib/config";
import { Reveal } from "@/components/Reveal";

export function InvitationMessage() {
  return (
    <section className="relative z-10 mx-auto max-w-md px-8 pb-10 text-center">
      <Reveal delay={0.15}>
        <p className="font-display text-base italic leading-relaxed text-ink sm:text-lg">
          {EVENT.invitationLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  );
}
