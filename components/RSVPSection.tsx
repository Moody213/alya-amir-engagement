"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";
import { submitRsvp, type Attendance } from "@/lib/rsvp";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/Ornament";

type Status = "idle" | "submitting" | "success" | "error";

export function RSVPSection({
  defaultGuestName,
  guestToken,
}: {
  defaultGuestName?: string;
  guestToken?: string;
}) {
  const [guestName, setGuestName] = useState(defaultGuestName ?? "");
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");

  const isSubmitting = status === "submitting";
  const isDone = status === "success";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting || isDone) return;

    const trimmedName = guestName.trim();
    if (!trimmedName) {
      setNameError("Please share your name.");
      return;
    }
    if (!attendance) {
      setErrorMessage("Please select whether you'll be attending.");
      return;
    }

    setNameError("");
    setErrorMessage("");
    setStatus("submitting");

    const result = await submitRsvp({
      guestName: trimmedName,
      attendance,
      guestToken,
      source: guestToken ? "personalized-link" : "general-link",
    });

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  return (
    <section id="rsvp" className="mx-auto max-w-md px-8 py-16 text-center">
      <Reveal>
        <SectionEyebrow>Kindly Reply</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl text-ink">RSVP</h2>
        <p className="mt-3 text-sm text-text-muted">
          Kindly confirm your attendance.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <AnimatePresence mode="wait">
          {isDone ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4 border border-gold-muted bg-background-alt/60 px-6 py-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold">
                {attendance === "YES" ? (
                  <Check className="h-5 w-5 text-gold" strokeWidth={1.5} />
                ) : (
                  <X className="h-5 w-5 text-gold" strokeWidth={1.5} />
                )}
              </div>
              <p className="font-display text-xl italic text-ink">
                {attendance === "YES"
                  ? "Thank you, we can't wait to celebrate with you."
                  : "Thank you for letting us know. You will be missed."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6 text-left"
            >
              <div>
                <label
                  htmlFor="guestName"
                  className="block text-[11px] uppercase tracking-widest-2 text-text-muted"
                >
                  Your Name
                </label>
                <input
                  id="guestName"
                  name="guestName"
                  type="text"
                  autoComplete="name"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (nameError) setNameError("");
                  }}
                  aria-invalid={Boolean(nameError)}
                  aria-describedby={nameError ? "guestName-error" : undefined}
                  suppressHydrationWarning
                  className="mt-2 w-full border-0 border-b border-line bg-transparent py-2 font-serif text-lg text-ink placeholder:text-text-muted/60 focus:border-gold focus:outline-none"
                  placeholder="Full name"
                />
                {nameError && (
                  <p id="guestName-error" className="mt-1 text-xs text-red-800" role="alert">
                    {nameError}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className="text-[11px] uppercase tracking-widest-2 text-text-muted">
                  Will you attend?
                </legend>
                <div className="mt-3 flex flex-col gap-3">
                  <AttendanceOption
                    label="Yes, I'll be there"
                    selected={attendance === "YES"}
                    onSelect={() => setAttendance("YES")}
                  />
                  <AttendanceOption
                    label="Sorry, I can't make it"
                    selected={attendance === "NO"}
                    onSelect={() => setAttendance("NO")}
                  />
                </div>
              </fieldset>

              {errorMessage && (
                <p className="text-xs text-red-800" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                suppressHydrationWarning
                className="mt-2 flex items-center justify-center gap-2 border border-ink py-3 text-xs uppercase tracking-widest-2 text-ink transition-colors hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                )}
                {isSubmitting ? "Sending" : "Send RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}

function AttendanceOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      suppressHydrationWarning
      className={`flex items-center justify-between border px-5 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        selected
          ? "border-gold bg-gold/10 text-ink"
          : "border-line text-text-muted hover:border-gold-muted"
      }`}
    >
      <span className="uppercase tracking-wider">{label}</span>
      <span
        className={`ml-3 h-3 w-3 shrink-0 rounded-full border ${
          selected ? "border-gold bg-gold" : "border-line"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
