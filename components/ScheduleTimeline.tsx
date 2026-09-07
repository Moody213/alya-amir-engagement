import { Sparkle, Gem, UtensilsCrossed, Moon } from "lucide-react";
import { SCHEDULE } from "@/lib/config";
import { THEME } from "@/lib/theme";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/Ornament";

const ICONS = [Sparkle, Gem, UtensilsCrossed, Moon];

export function ScheduleTimeline() {
  const t = THEME.scheduleTimeline;
  return (
    <section
      className="px-6"
      style={{ paddingTop: t.paddingTop, paddingBottom: t.paddingBottom }}
    >
      <Reveal className="text-center">
        <SectionEyebrow style={t.eyebrow}>Order of the Evening</SectionEyebrow>
        <h2
          className="on-art mt-3 font-display"
          style={{ fontSize: t.heading.fontSize, color: t.heading.color }}
        >
          The Schedule
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-14 max-w-sm">
        <div className="hairline-v absolute left-6 top-2 bottom-2 sm:left-7" />

        <ol className="space-y-12">
          {SCHEDULE.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <li className="relative flex gap-5 pl-0">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-background-alt sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden="true" />
                  </div>
                  <div className="mt-1 rounded-md bg-background-alt/80 px-4 py-3 backdrop-blur-[1px]">
                    <p
                      className="uppercase tracking-widest-2 text-base"
                      style={{color: t.itemTime.color }}
                    >
                      {item.time}
                    </p>
                    <h3
                      className="mt-1 font-display"
                      style={{ fontSize: t.itemTitle.fontSize, color: t.itemTitle.color }}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p
                        className="mt-2 leading-relaxed"
                        style={{
                          fontSize: t.itemDescription.fontSize,
                          color: t.itemDescription.color,
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
