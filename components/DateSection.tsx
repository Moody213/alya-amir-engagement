import { EVENT } from "@/lib/config";
import { THEME } from "@/lib/theme";
import { Reveal } from "@/components/Reveal";

export function DateSection() {
  const t = THEME.dateSection;
  return (
    <div
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center"
      style={{ top: t.top, left: t.left }}
    >
      <Reveal>
        <p
          className="font-display uppercase tracking-[0.25em] [text-shadow:0_1px_2px_rgba(253,250,244,0.5)]"
          style={{ fontSize: t.weekday.fontSize, color: t.weekday.color }}
        >
          {EVENT.dateDisplay.weekday}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p
          className="font-display font-semibold leading-tight [text-shadow:0_1px_3px_rgba(253,250,244,0.6)]"
          style={{ fontSize: t.day.fontSize, color: t.day.color }}
        >
          {EVENT.dateDisplay.day} {EVENT.dateDisplay.month}
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p
          className="font-display tracking-[0.3em] [text-shadow:0_1px_2px_rgba(253,250,244,0.5)]"
          style={{ fontSize: t.year.fontSize, color: t.year.color }}
        >
          {EVENT.dateDisplay.year}
        </p>
      </Reveal>
    </div>
  );
}
