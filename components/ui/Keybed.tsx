"use client";

import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * KEYBED — the site's signature element.
 *
 * A piano keybed drawn entirely in CSS gradients: ivory white keys, hairline
 * separators, and the real black-key pattern on top. Sitting under the header
 * it doubles as the scroll-progress indicator, the rose fill advancing across
 * the keys the way a hand travels up the instrument.
 *
 * Geometry: one octave is 112px — seven white keys at 16px each. The five
 * black keys are 10px wide and straddle the white-key boundaries at 16/32 and
 * 64/80/96, leaving the wide gap at 48 where E and F meet with no black key
 * between them. That gap is what makes the pattern read as a piano rather
 * than as stripes.
 * -------------------------------------------------------------------------*/

const OCTAVE = 112;

const blackKeys = `repeating-linear-gradient(90deg,
  transparent 0 11px, var(--kb-black) 11px 21px,
  transparent 21px 27px, var(--kb-black) 27px 37px,
  transparent 37px 59px, var(--kb-black) 59px 69px,
  transparent 69px 75px, var(--kb-black) 75px 85px,
  transparent 85px 91px, var(--kb-black) 91px 101px,
  transparent 101px ${OCTAVE}px)`;

const whiteKeys = `repeating-linear-gradient(90deg,
  var(--kb-line) 0 1px, transparent 1px 16px)`;

const keyLayers = {
  backgroundImage: `${blackKeys}, ${whiteKeys}`,
  backgroundSize: `${OCTAVE}px 58%, 16px 100%`,
  backgroundRepeat: "repeat-x, repeat-x",
  backgroundPosition: "left top, left top",
} as const;

/* `ivory` is the full-contrast keybed. `muted` draws the unplayed keys in
 * dark navy tones, so under the header the eye goes to the rose progress
 * fill instead of reading a black-and-white barcode across the screen. */
const unplayed = {
  ivory: { bg: "#ffffff", black: "#0d101b", line: "#0d101b33" },
  muted: { bg: "#262b3f", black: "#0b0d16", line: "#ffffff14" },
} as const;

export function Keybed({
  progress,
  tone = "ivory",
  className,
}: {
  /** 0–1. When given, the keys fill with rose up to this fraction. */
  progress?: number;
  tone?: keyof typeof unplayed;
  className?: string;
}) {
  const keys = unplayed[tone];
  const pct = progress === undefined ? 0 : Math.min(1, Math.max(0, progress));

  return (
    <div
      aria-hidden
      className={cn("relative w-full overflow-hidden", className)}
      style={{ backgroundColor: keys.bg }}
    >
      {/* Unplayed */}
      <div
        className="absolute inset-0"
        style={
          {
            ...keyLayers,
            "--kb-black": keys.black,
            "--kb-line": keys.line,
          } as React.CSSProperties
        }
      />
      {/* Played — clipped to the scroll fraction */}
      {progress !== undefined && (
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-rose transition-[width] duration-150 ease-out"
          style={{ width: `${pct * 100}%` }}
        >
          <div
            className="absolute inset-0"
            style={
              {
                ...keyLayers,
                "--kb-black": "#421f2a",
                "--kb-line": "#ffffff4d",
              } as React.CSSProperties
            }
          />
        </div>
      )}
    </div>
  );
}
