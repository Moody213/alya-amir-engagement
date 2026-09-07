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
          className="mx-auto max-w-70 font-display italic leading-relaxed tracking-wide sm:max-w-none"
          style={{ fontSize: t.text.fontSize, color: t.text.color }}
        >
          {EVENT.invitationLines.map((line, i) => (
            <span key={i} className="block mb-3">
              {line}
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  );
}
