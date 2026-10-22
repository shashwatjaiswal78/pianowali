/* ---------------------------------------------------------------------------
 * FEATURE ICONS — the "What's included" set.
 *
 * Drawn for this site rather than taken from an icon library: solid, chunky
 * two-tone glyphs on a 48px grid, made to sit on a brand-colour tile.
 *
 * Each icon paints with three colours, all set by the tile around it:
 *   currentColor        the main shape
 *   --icon-accent       the second tone (gold, rose…)
 *   --icon-bg           the tile colour, used for knock-outs (a play button
 *                       cut out of a screen, the gap between two bubbles)
 * -------------------------------------------------------------------------*/

type Props = { className?: string };

const base = {
  viewBox: "0 0 48 48",
  "aria-hidden": true,
  focusable: false,
} as const;

const ACCENT = "var(--icon-accent)";
const BG = "var(--icon-bg)";

/* 25 video lessons — a stack of lesson screens, play button on the front */
export function LessonsIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="13" y="6" width="29" height="21" rx="4.5" fill={ACCENT} />
      <rect
        x="6" y="14" width="32" height="24" rx="5.5"
        fill="currentColor" stroke={BG} strokeWidth="3" paintOrder="stroke"
      />
      <path d="M18.5 20.2v11.6a1 1 0 0 0 1.5.86l9.7-5.8a1 1 0 0 0 0-1.72l-9.7-5.8a1 1 0 0 0-1.5.86z" fill={BG} />
      <rect x="6" y="41" width="32" height="3" rx="1.5" fill={ACCENT} opacity="0.55" />
    </svg>
  );
}

/* Hindi + English songs — two beamed notes */
export function SongsIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M19 11.5 43 5.5v7.6L19 19.1z" fill={ACCENT} />
      <rect x="19" y="12" width="4" height="25" rx="1" fill="currentColor" />
      <rect x="39" y="7" width="4" height="25" rx="1" fill="currentColor" />
      <ellipse cx="15.5" cy="37" rx="7" ry="5.4" transform="rotate(-22 15.5 37)" fill="currentColor" />
      <ellipse cx="35.5" cy="32" rx="7" ry="5.4" transform="rotate(-22 35.5 32)" fill="currentColor" />
    </svg>
  );
}

/* Sunday live doubt sessions — a calendar with one day lit up */
export function LiveIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="9" width="36" height="34" rx="6.5" fill="currentColor" />
      <path d="M12.5 9h23A6.5 6.5 0 0 1 42 15.5V19H6v-3.5A6.5 6.5 0 0 1 12.5 9z" fill={ACCENT} />
      <rect x="13" y="4" width="4.5" height="10" rx="2.25" fill="currentColor" stroke={BG} strokeWidth="2" paintOrder="stroke" />
      <rect x="30.5" y="4" width="4.5" height="10" rx="2.25" fill="currentColor" stroke={BG} strokeWidth="2" paintOrder="stroke" />
      <g fill={BG} opacity="0.9">
        <rect x="12" y="24" width="5" height="5" rx="1.5" />
        <rect x="21.5" y="24" width="5" height="5" rx="1.5" />
        <rect x="31" y="24" width="5" height="5" rx="1.5" />
        <rect x="12" y="33" width="5" height="5" rx="1.5" />
        <rect x="21.5" y="33" width="5" height="5" rx="1.5" />
      </g>
      {/* Sunday */}
      <circle cx="33.5" cy="35.5" r="4.5" fill={ACCENT} />
    </svg>
  );
}

/* WhatsApp community — two speech bubbles in conversation */
export function CommunityIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M24 5h13a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6h-.5l2.5 6-8.5-6H24a6 6 0 0 1-6-6v-8a6 6 0 0 1 6-6z" fill={ACCENT} />
      <path
        d="M12 15h16a7 7 0 0 1 7 7v7a7 7 0 0 1-7 7H17l-9 7 2.5-7.3A7 7 0 0 1 5 29v-7a7 7 0 0 1 7-7z"
        fill="currentColor" stroke={BG} strokeWidth="3.5" strokeLinejoin="round" paintOrder="stroke"
      />
      <g fill={BG}>
        <circle cx="13" cy="25.5" r="2.4" />
        <circle cx="20" cy="25.5" r="2.4" />
        <circle cx="27" cy="25.5" r="2.4" />
      </g>
    </svg>
  );
}

/* Certificate of completion — a rosette with ribbon tails */
export function CertificateIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M17 27 11.5 44l6.3-2.7L22 46.5 25.5 31z" fill={ACCENT} />
      <path d="M31 27l5.5 17-6.3-2.7-4.2 5.2L22.5 31z" fill={ACCENT} />
      <circle cx="24" cy="20" r="15" fill="currentColor" stroke={BG} strokeWidth="3" paintOrder="stroke" />
      <circle cx="24" cy="20" r="10.5" fill="none" stroke={BG} strokeWidth="1.5" opacity="0.45" />
      <path
        d="M24.00 12.80 L25.82 17.49 L30.85 17.78 L26.95 20.96 L28.23 25.82 L24.00 23.10 L19.77 25.82 L21.05 20.96 L17.15 17.78 L22.18 17.49 Z"
        fill={ACCENT} stroke={ACCENT} strokeWidth="1.2" strokeLinejoin="round"
      />
    </svg>
  );
}

/* Lifetime access — a bold infinity loop with a spark */
export function LifetimeIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path
        d="M24 26c-3.6-4.7-7.2-7.6-11-7.6a7.6 7.6 0 0 0 0 15.2c3.8 0 7.4-2.9 11-7.6s7.2-7.6 11-7.6a7.6 7.6 0 0 1 0 15.2c-3.8 0-7.4-2.9-11-7.6z"
        fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M38.5 3.5l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z" fill={ACCENT} />
    </svg>
  );
}

export const featureIcons = {
  lessons: LessonsIcon,
  songs: SongsIcon,
  live: LiveIcon,
  community: CommunityIcon,
  certificate: CertificateIcon,
  lifetime: LifetimeIcon,
} as const;

export type FeatureIconName = keyof typeof featureIcons;
