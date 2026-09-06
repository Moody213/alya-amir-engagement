"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Background music control.
 * EDITABLE: replace /public/audio/background-music.mp3 with your own
 * track. If the file is missing, the button stays available but
 * silently does nothing — it never throws or blocks the page.
 *
 * Mobile browsers block autoplay, so playback only ever starts after
 * a real user tap (either this button, or the "Tap to Open" gesture
 * that reveals the invitation).
 */
export function MusicControl({ armed }: { armed: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (armed && !hasStarted) {
      const audio = audioRef.current;
      if (!audio) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          setHasStarted(true);
        });
    }
  }, [armed, hasStarted]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
      </audio>
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Turn music off" : "Turn music on"}
        aria-pressed={isPlaying}
        suppressHydrationWarning
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold-muted bg-cream/90 text-gold shadow-sm backdrop-blur transition-colors hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {isPlaying ? (
          <Volume2 className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
        ) : (
          <VolumeX className="h-4 w-4 opacity-60" strokeWidth={1.25} aria-hidden="true" />
        )}
      </button>
    </>
  );
}
