"use client";

import { useState } from "react";
import { CalendarPlus, ChevronDown } from "lucide-react";
import { getGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";

export function CalendarButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        suppressHydrationWarning
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest-2 text-gold underline decoration-gold-muted underline-offset-4 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <CalendarPlus className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
        Add to Calendar
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-10 mt-3 w-52 -translate-x-1/2 border border-gold-muted bg-cream py-2 text-left shadow-sm">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-xs uppercase tracking-wider text-ink hover:bg-background-alt"
          >
            Google Calendar
          </a>
          <button
            type="button"
            onClick={() => {
              downloadIcsFile();
              setOpen(false);
            }}
            suppressHydrationWarning
            className="block w-full px-4 py-2 text-left text-xs uppercase tracking-wider text-ink hover:bg-background-alt"
          >
            Apple / Outlook (.ics)
          </button>
        </div>
      )}
    </div>
  );
}
