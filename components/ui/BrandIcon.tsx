/* lucide-react no longer ships brand marks, so these are drawn here. They are
 * stroke-based at the same 24px grid and 1.75 weight as every other icon on
 * the page — a filled brand glyph next to Lucide line icons reads as a
 * mismatch, and the design system asks for one consistent icon language. */

type Props = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function InstagramIcon({ className }: Props) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className }: Props) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="1.5" y="5" width="21" height="14" rx="4.5" />
      <path d="M10.2 9.3v5.4l4.6-2.7z" />
    </svg>
  );
}

export function WhatsappIcon({ className }: Props) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M3.5 20.5l1.3-4a8.2 8.2 0 1 1 3.1 3z" />
      <path d="M9 9.2c.3 1.3 1.2 2.6 2.3 3.5 1 .8 1.9 1.1 2.6 1.2l.8-1.2 1.7.9-.5 1.3c-1.4.5-3.4-.3-5.1-1.7-1.6-1.4-2.7-3.3-2.6-4.7l1.2-.7 1 1.6z" />
    </svg>
  );
}
