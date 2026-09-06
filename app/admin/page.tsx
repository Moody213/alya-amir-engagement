"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check, X, Loader2, Lock } from "lucide-react";
import { EVENT, ADMIN_CONFIG } from "@/lib/config";
import { fetchRsvpStats, type RsvpStats } from "@/lib/rsvp";

const SESSION_KEY = "alya-amir-admin-unlocked";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Reads browser-only sessionStorage after mount; SSR always starts
  // locked, so this is a genuine sync-with-external-system effect,
  // not state derivable during render.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUnlocked(true);
      }
    } catch {
      // sessionStorage unavailable (private mode, etc.) — stay locked.
    }
  }, []);

  function handleUnlock(e: FormEvent) {
    e.preventDefault();
    if (passcode === ADMIN_CONFIG.passcode) {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setUnlocked(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect passcode.");
    }
  }

  if (!unlocked) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold">
          <Lock className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-display text-2xl text-ink">Admin Access</h1>
        <p className="mt-2 max-w-xs text-sm text-text-muted">
          This dashboard is protected by a shared passcode. See README.md for
          its security limitations.
        </p>
        <form onSubmit={handleUnlock} className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            aria-label="Admin passcode"
            className="w-full border-0 border-b border-line bg-transparent py-2 text-center font-serif text-lg text-ink focus:border-gold focus:outline-none"
          />
          {authError && (
            <p className="text-xs text-red-800" role="alert">
              {authError}
            </p>
          )}
          <button
            type="submit"
            className="mt-2 border border-ink py-3 text-xs uppercase tracking-widest-2 text-ink transition-colors hover:bg-ink hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return <Dashboard />;
}

function Dashboard() {
  const [stats, setStats] = useState<RsvpStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const result = await fetchRsvpStats();
      if (cancelled) return;
      if (result) {
        setStats(result);
        setError(false);
      } else {
        setError(true);
      }
      setLoading(false);
    }
    load();
    const interval = setInterval(load, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="font-script text-4xl text-ink">{EVENT.coupleShortName}</p>
          <p className="mt-2 text-[11px] uppercase tracking-widest-2 text-gold">
            RSVP Overview
          </p>
        </div>

        {loading && (
          <div className="mt-14 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-gold" aria-hidden="true" />
          </div>
        )}

        {!loading && error && (
          <p className="mt-14 text-center text-sm text-text-muted">
            RSVP data is not connected yet. Add your Apps Script URL to
            NEXT_PUBLIC_RSVP_APPS_SCRIPT_URL and redeploy.
          </p>
        )}

        {!loading && stats && (
          <>
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <StatCard label="Confirmed" value={stats.confirmed} />
              <StatCard label="Declined" value={stats.declined} />
              <StatCard label="Total Responses" value={stats.total} />
            </div>

            <div className="mt-12 overflow-x-auto border border-line/60">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line/60 text-[11px] uppercase tracking-wider text-text-muted">
                    <th className="px-4 py-3 font-medium">Guest Name</th>
                    <th className="px-4 py-3 font-medium">Attendance</th>
                    <th className="px-4 py-3 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.rows.map((row, i) => (
                    <tr key={i} className="border-b border-line/20 last:border-0">
                      <td className="px-4 py-3 text-ink">{row.guestName}</td>
                      <td className="px-4 py-3">
                        {row.attendance === "YES" ? (
                          <span className="inline-flex items-center gap-1 text-ink">
                            <Check className="h-3.5 w-3.5 text-gold" /> Attending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-text-muted">
                            <X className="h-3.5 w-3.5" /> Declined
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        {new Date(row.timestamp).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                  {stats.rows.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-center text-text-muted">
                        No responses yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-line/60 bg-background-alt/50 px-3 py-6">
      <p className="font-display text-3xl text-ink">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest-2 text-text-muted">
        {label}
      </p>
    </div>
  );
}
