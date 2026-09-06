"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EVENT } from "@/lib/config";
import { Ornament } from "@/components/Ornament";

type InvitationHeroProps = {
  isOpened: boolean;
  onOpen: () => void;
  guestName?: string;
};

export function InvitationHero({ isOpened, onOpen, guestName }: InvitationHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpened) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpened]);

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 text-center"
          exit={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 1.04,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
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
            <p className="text-[11px] tracking-widest-2 uppercase text-gold">
              {guestName ? `An invitation for ${guestName}` : "You are invited"}
            </p>

            <Ornament className="h-4 w-24 text-gold-muted" />

            <motion.button
              type="button"
              onClick={onOpen}
              suppressHydrationWarning
              className="group relative mt-2 flex cursor-pointer items-center justify-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              animate={
                shouldReduceMotion
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
              </motion.div>
            </motion.button>

            <div className="mt-2 space-y-1">
              <p className="font-script text-6xl leading-none text-ink">
                {EVENT.groomName}
              </p>
              <p className="font-script text-3xl text-gold">&amp;</p>
              <p className="font-script text-6xl leading-none text-ink">
                {EVENT.brideName}
              </p>
            </div>

            <p className="mt-1 text-xs uppercase tracking-widest-2 text-text-muted">
              {EVENT.dateDisplay.weekday}, {EVENT.dateDisplay.day}{" "}
              {EVENT.dateDisplay.month} {EVENT.dateDisplay.year}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
