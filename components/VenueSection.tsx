import { MapPin } from "lucide-react";
import { EVENT } from "@/lib/config";
import { THEME } from "@/lib/theme";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/Ornament";
import { CalendarButton } from "@/components/CalendarButton";

export function VenueSection() {
  const t = THEME.venueSection;
  return (
    <section
      className="mx-auto max-w-md px-8 text-center"
      style={{ paddingTop: t.paddingTop, paddingBottom: t.paddingBottom }}
    >
      <Reveal>
        <SectionEyebrow style={t.eyebrow}>Where We Celebrate</SectionEyebrow>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-background-alt">
          <MapPin className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden="true" />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <h3
          className="mt-6 font-display"
          style={{ fontSize: t.venueName.fontSize, color: t.venueName.color }}
        >
          {EVENT.venueName}
        </h3>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={EVENT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-ink px-8 py-3 text-xs uppercase tracking-widest-2 text-ink transition-colors hover:bg-ink hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View Location
          </a>
          <CalendarButton />
        </div>
      </Reveal>
    </section>
  );
}
