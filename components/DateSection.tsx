import { EVENT } from "@/lib/config";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export function DateSection() {
  return (
    <section className="flex flex-col items-center gap-4 px-6 py-14 text-center">
      <Reveal>
        <p className="font-display text-sm uppercase tracking-widest-2 text-text-muted">
          {EVENT.dateDisplay.weekday}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="font-display text-4xl text-ink sm:text-5xl">
          {EVENT.dateDisplay.day} {EVENT.dateDisplay.month}
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="font-display text-sm tracking-[0.4em] text-gold">
          {EVENT.dateDisplay.year}
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <Ornament className="mt-2 h-4 w-24 text-gold-muted" />
      </Reveal>
    </section>
  );
}
