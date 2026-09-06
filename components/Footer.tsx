import { EVENT } from "@/lib/config";
import { Ornament } from "@/components/Ornament";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 px-6 pb-14 pt-6 text-center">
      <Ornament className="h-4 w-24 text-gold-muted" />
      <p className="font-script text-3xl text-ink">
        {EVENT.brideName} &amp; {EVENT.groomName}
      </p>
      <p className="text-[11px] uppercase tracking-widest-2 text-text-muted">
        {EVENT.dateDisplay.weekday}, {EVENT.dateDisplay.day} {EVENT.dateDisplay.month}{" "}
        {EVENT.dateDisplay.year}
      </p>
      <p className="mt-4 text-xs text-text-muted/70">
        With love and gratitude for sharing this moment with us.
      </p>
    </footer>
  );
}
