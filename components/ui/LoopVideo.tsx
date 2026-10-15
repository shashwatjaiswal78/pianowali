"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * LOOP VIDEO — a short clip used in place of a still image.
 *
 * Plays muted on a loop, and only while it is on screen. Two controls sit on
 * the frame: pause/play (moving content that runs past five seconds must be
 * pausable) and sound on/off. With reduced motion requested it never starts
 * by itself: it shows the poster and waits for the play button.
 *
 * A visitor who pauses it stays paused — scrolling away and back does not
 * restart it.
 * -------------------------------------------------------------------------*/
export function LoopVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // the attribute alone is unreliable for autoplay in React
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      userPaused.current = true;
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else if (!entry.isIntersecting) v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    // Turning the sound on is a request to hear it: play if it was paused
    if (!v.muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  };

  const control =
    "grid size-11 cursor-pointer place-items-center rounded-full bg-navy/70 text-ivory backdrop-blur-sm transition-colors duration-[var(--dur-fast)] hover:bg-navy/90";

  return (
    <div className={cn("on-dark relative bg-navy", className)}>
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute right-3 bottom-3 flex gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          className={control}
        >
          {playing ? (
            <Pause aria-hidden className="size-4.5 fill-current" strokeWidth={0} />
          ) : (
            <Play aria-hidden className="ml-0.5 size-4.5 fill-current" strokeWidth={0} />
          )}
        </button>
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
          className={control}
        >
          {muted ? (
            <VolumeX aria-hidden className="size-4.5" strokeWidth={2} />
          ) : (
            <Volume2 aria-hidden className="size-4.5" strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
}
