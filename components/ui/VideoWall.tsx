"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type WallVideo = { src: string; poster: string; duration: string };

/* ---------------------------------------------------------------------------
 * VIDEO WALL — student progress videos.
 *
 * Each tile is a poster with a play button; nothing is downloaded until a
 * tile is pressed (five clips are ~44MB between them). Pressing one swaps in
 * a native <video> with controls and plays it; pressing another stops the
 * first, so only one ever plays.
 *
 * The first video is featured: two columns by two rows from lg, beside a 2×2
 * of the rest. Every clip is 16:9, so the rows line up exactly.
 * -------------------------------------------------------------------------*/
export function VideoWall({
  videos,
  className,
}: {
  videos: WallVideo[];
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <ul
      className={cn(
        "grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4",
        className,
      )}
    >
      {videos.map((v, i) => {
        const featured = i === 0;
        const label = `Student progress video ${i + 1}, ${spoken(v.duration)}`;
        return (
          <li
            key={v.src}
            className={cn(
              "relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-navy shadow-[var(--shadow-card)]",
              featured && "sm:col-span-2 lg:row-span-2 lg:rounded-[var(--radius-media)]",
            )}
          >
            {active === i ? (
              <video
                className="absolute inset-0 size-full object-cover"
                src={v.src}
                poster={v.poster}
                controls
                autoPlay
                playsInline
                aria-label={label}
              />
            ) : (
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Play ${label}`}
                className="group absolute inset-0 size-full cursor-pointer"
              >
                <Image
                  src={v.poster}
                  alt=""
                  fill
                  sizes={
                    featured
                      ? "(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 560px"
                      : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 270px"
                  }
                  className="object-cover transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose-cta text-ivory shadow-[var(--shadow-rose)] transition-colors duration-[var(--dur-base)] group-hover:bg-rose-hover",
                    featured ? "size-16 sm:size-20" : "size-12",
                  )}
                >
                  <Play
                    className={cn("ml-1 fill-current", featured ? "size-6 sm:size-7" : "size-5")}
                    strokeWidth={0}
                  />
                </span>
                <span
                  aria-hidden
                  className="absolute bottom-3 left-3 rounded-[var(--radius-pill)] bg-navy/75 px-2.5 py-0.5 text-[length:var(--text-micro)] font-bold text-ivory tabular-nums backdrop-blur-sm"
                >
                  {v.duration}
                </span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* "1:13" → "1 minute 13 seconds", for the button's accessible name */
function spoken(d: string) {
  const [m, s] = d.split(":").map(Number);
  const parts = [];
  if (m) parts.push(`${m} minute${m === 1 ? "" : "s"}`);
  if (s) parts.push(`${s} second${s === 1 ? "" : "s"}`);
  return parts.join(" ");
}
