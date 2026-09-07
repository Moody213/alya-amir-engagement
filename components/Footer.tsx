import { EVENT } from "@/lib/config";
import { THEME } from "@/lib/theme";
import { Ornament } from "@/components/Ornament";

export function Footer() {
  const t = THEME.footer;
  return (
    <footer
      className="flex flex-col items-center gap-4 px-6 text-center"
      style={{ paddingTop: t.paddingTop, paddingBottom: t.paddingBottom }}
    >
      <Ornament className="h-4 w-24 text-gold-muted" />
      <p
        className="font-script"
        style={{ fontSize: t.names.fontSize, color: t.names.color }}
      >
        {EVENT.groomName} &amp; {EVENT.brideName}
      </p>
      <p
        className="uppercase tracking-widest-2"
        style={{ fontSize: t.dateLine.fontSize, color: t.dateLine.color }}
      >
        {EVENT.dateDisplay.weekday}, {EVENT.dateDisplay.day} {EVENT.dateDisplay.month}{" "}
        {EVENT.dateDisplay.year}
      </p>
      <p
        className="mt-4"
        style={{ fontSize: t.note.fontSize, color: t.note.color }}
      >
        With love and gratitude for sharing this moment with us.
      </p>
    </footer>
  );
}
