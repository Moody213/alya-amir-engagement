"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EVENT } from "@/lib/config";
import { THEME } from "@/lib/theme";
import { Ornament } from "@/components/Ornament";

type InvitationHeroProps = {
  isOpened: boolean;
  onOpen: () => void;
  guestName?: string;
};

type OpenPhase = "idle" | "flap" | "paper";

const FLAP_CLIP =
  "polygon(1.7% 2.3%, 98.3% 2.3%, 50% 56.8%)";

export function InvitationHero({ isOpened, onOpen, guestName }: InvitationHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const t = THEME.hero;

  const envelopeRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<OpenPhase>("idle");
  const [origin, setOrigin] = useState<{ top: number; left: number; width: number; height: number } | null>(
    null
  );

  useEffect(() => {
    if (isOpened) return;

    // `overflow: hidden` on body alone doesn't stop touch-scrolling on iOS
    // Safari (it still rubber-bands the page behind this fixed overlay), so
    // pin body in place as well while the gate is up.
    const scrollY = window.scrollY;
    const html = document.documentElement;
    const { overflow: bodyOverflow, position, top, left, right, width } =
      document.body.style;
    const { overflow: htmlOverflow } = html.style;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      html.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.left = left;
      document.body.style.right = right;
      document.body.style.width = width;
      window.scrollTo(0, scrollY);
    };
  }, [isOpened]);

  function handleTap() {
    if (phase !== "idle") return;

    if (shouldReduceMotion) {
      onOpen();
      return;
    }

    const rect = envelopeRef.current?.getBoundingClientRect();
    setOrigin(
      rect
        ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
        : { top: window.innerHeight / 2 - 44, left: window.innerWidth / 2 - 60, width: 120, height: 88 }
    );
    // Flap lifts first, then the paper rises out of the envelope and
    // expands to fill the screen — onOpen() only fires once the paper
    // fully covers the viewport, so the swap to the real page underneath
    // is invisible.
    setPhase("flap");
    window.setTimeout(() => setPhase("paper"), 100);
  }

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overscroll-none bg-background px-6 text-center [touch-action:none]"
          exit={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 1.04,
            transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="pointer-events-none absolute inset-6 border border-gold-muted/60" />
          <div className="pointer-events-none absolute inset-8 border border-gold-muted/30" />

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
            suppressHydrationWarning
          >
            <p
              className="tracking-widest-2 uppercase"
              style={{ fontSize: t.eyebrow.fontSize, color: t.eyebrow.color }}
            >
              {guestName ? `An invitation for ${guestName}` : "You are invited"}
            </p>

            <Ornament className="h-4 w-24 text-gold-muted" />

            <motion.button
              ref={envelopeRef}
              type="button"
              onClick={handleTap}
              suppressHydrationWarning
              className="group relative mt-2 flex cursor-pointer items-center justify-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              animate={
                shouldReduceMotion || phase !== "idle"
                  ? {}
                  : { scale: [1, 1.06, 1] }
              }
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-label="Tap to open your invitation"
            >
              <span className="sr-only">Tap to open your invitation</span>
              <motion.div
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
                style={{ perspective: 400 }}
                suppressHydrationWarning
              >
                <svg
                  width="120"
                  height="88"
                  viewBox="0 0 120 88"
                  fill="none"
                  aria-hidden="true"
                  className="text-ink transition-colors group-hover:text-gold"
                >
                  <rect
                    x="2"
                    y="2"
                    width="116"
                    height="84"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M2 4L60 50L118 4"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>

                {/* Flap that lifts open once tapped, revealing the paper
                    rising out of the envelope behind it. */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 bg-background"
                  style={{ clipPath: FLAP_CLIP, transformOrigin: "50% 2.3%" }}
                  animate={
                    phase === "idle"
                      ? { rotateX: 0, opacity: 1 }
                      : { rotateX: -155, opacity: 1 }
                  }
                  transition={{ duration: 0.13, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* The letter, peeking up out of the envelope. */}
                <motion.div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-10 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-gold-muted bg-cream"
                  initial={{ opacity: 0, y: 6, scale: 0.7 }}
                  animate={
                    phase === "flap"
                      ? { opacity: 1, y: -6, scale: 0.85 }
                      : phase === "paper"
                        ? { opacity: 0, scale: 0.85 }
                        : { opacity: 0, y: 6, scale: 0.7 }
                  }
                  transition={{ duration: 0.11, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </motion.button>

            <div className="mt-2 space-y-1">
              <p
                className="font-script leading-none"
                style={{ fontSize: t.names.fontSize, color: t.names.color }}
              >
                {EVENT.groomName}
              </p>
              <p
                className="font-script"
                style={{ fontSize: t.ampersand.fontSize, color: t.ampersand.color }}
              >
                &amp;
              </p>
              <p
                className="font-script leading-none"
                style={{ fontSize: t.names.fontSize, color: t.names.color }}
              >
                {EVENT.brideName}
              </p>
            </div>

            <p
              className="mt-1 uppercase tracking-widest-2"
              style={{ fontSize: t.dateLine.fontSize, color: t.dateLine.color }}
            >
              {EVENT.dateDisplay.weekday}, {EVENT.dateDisplay.day}{" "}
              {EVENT.dateDisplay.month} {EVENT.dateDisplay.year}
            </p>
          </motion.div>

          {/* The paper: rises out of the envelope and expands to cover the
              screen. It's tinted with the same background art used on the
              page underneath, so once it fully covers the viewport the
              swap to the real page is seamless. */}
          {phase !== "idle" && origin && (
            <motion.div
              aria-hidden="true"
              className="fixed z-10 overflow-hidden rounded-md shadow-2xl"
              style={{
                backgroundImage: "url(/background.webp)",
                backgroundSize: "260% auto",
                backgroundPosition: "50% 12%",
              }}
              initial={{
                top: origin.top + origin.height * 0.15,
                left: origin.left + origin.width * 0.28,
                width: origin.width * 0.44,
                height: origin.height * 0.4,
                opacity: 0,
              }}
              animate={
                phase === "flap"
                  ? {
                      top: origin.top - origin.height * 0.1,
                      left: origin.left + origin.width * 0.18,
                      width: origin.width * 0.64,
                      height: origin.height * 0.55,
                      opacity: 1,
                      borderRadius: 6,
                    }
                  : {
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      opacity: 1,
                      borderRadius: 0,
                    }
              }
              transition={
                phase === "flap"
                  ? { duration: 0.11, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
              }
              onAnimationComplete={() => {
                if (phase === "paper") onOpen();
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
