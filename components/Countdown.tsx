"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/config";
import { THEME } from "@/lib/theme";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/Ornament";

/**
 * EVENT_START_TIME
 * -----------------
 * Built from EVENT.date + EVENT.startTime in lib/config.ts. Update
 * those two fields once the exact ceremony start time is confirmed —
 * this component will automatically reflect the change.
 */
const EVENT_START_TIME = new Date(`${EVENT.date}T${EVENT.startTime}:00`);

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = EVENT_START_TIME.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    const update = () => {
      const remaining = EVENT_START_TIME.getTime() - Date.now();
      setHasArrived(remaining <= 0);
      setTimeLeft(getTimeLeft());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const units: { label: string; value: number }[] = timeLeft
    ? [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ]
    : [];

  const t = THEME.countdown;

  return (
    <section
      className="px-6 text-center"
      style={{ paddingTop: t.paddingTop, paddingBottom: t.paddingBottom }}
    >
      <Reveal>
        <SectionEyebrow style={t.eyebrow}>Counting Down</SectionEyebrow>
      </Reveal>

      {hasArrived ? (
        <Reveal delay={0.1}>
          <p className="mt-8 font-display text-2xl italic text-ink">
            The celebration has begun!
          </p>
        </Reveal>
      ) : (
        <RevealStagger className="mx-auto mt-8 grid max-w-sm grid-cols-4 gap-2 sm:gap-4">
          {units.map((unit) => (
            <RevealItem key={unit.label}>
              <div className="flex flex-col items-center rounded-full border border-gold-muted/70 bg-background-alt/85 px-1 py-4 shadow-sm sm:px-2">
                <span
                  className="font-display tabular-nums"
                  style={{ fontSize: t.unitValue.fontSize, color: t.unitValue.color }}
                  aria-hidden="true"
                >
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span
                  className="mt-1 uppercase tracking-widest-2"
                  style={{ fontSize: t.unitLabel.fontSize, color: t.unitLabel.color }}
                >
                  {unit.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {timeLeft && !hasArrived
          ? `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds until the celebration.`
          : ""}
      </span>
    </section>
  );
}
