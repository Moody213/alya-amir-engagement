import { EVENT } from "@/lib/config";
import { Reveal } from "@/components/Reveal";

export function DateSection() {
  return (
    <div className="absolute left-1/2 top-[49%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center">
      <Reveal>
        <p className="font-display text-[15px] uppercase tracking-[0.25em] text-ink [text-shadow:0_1px_2px_rgba(253,250,244,0.5)]">
          {EVENT.dateDisplay.weekday}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="font-display text-2xl font-semibold leading-tight text-ink [text-shadow:0_1px_3px_rgba(253,250,244,0.6)] sm:text-[40px]">
          {EVENT.dateDisplay.day} {EVENT.dateDisplay.month}
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="font-display text-[20px] tracking-[0.3em] text-ink [text-shadow:0_1px_2px_rgba(253,250,244,0.5)]">
          {EVENT.dateDisplay.year}
        </p>
      </Reveal>
    </div>
  );
}
