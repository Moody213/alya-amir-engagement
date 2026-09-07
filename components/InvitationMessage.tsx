import { EVENT } from "@/lib/config";
import { THEME } from "@/lib/theme";
import { Reveal } from "@/components/Reveal";

export function InvitationMessage() {
  const t = THEME.invitationMessage;
  return (
    <section
      className="relative z-10 mx-auto max-w-md px-8 text-center"
      style={{ paddingTop: t.paddingTop, paddingBottom: t.paddingBottom }}
    >
      <Reveal delay={0.15}>
        <p
          className="font-display italic leading-relaxed"
          style={{ fontSize: t.text.fontSize, color: t.text.color }}
        >
          {EVENT.invitationLines.map((line, i) => (
            <span key={i} className="block text-gold-muted">
              {line}
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  );
}
