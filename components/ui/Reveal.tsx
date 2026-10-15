import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * REVEAL
 *
 * Content is visible by default and the entrance is layered on top only where
 * the browser supports scroll-driven animation. An earlier version used an
 * IntersectionObserver with `opacity: 0` as the initial state, which meant any
 * block whose observer never fired stayed invisible — content must never be
 * gated behind an animation. This version cannot fail that way, needs no
 * client JavaScript, and is switched off entirely by reduced-motion.
 * -------------------------------------------------------------------------*/
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Stagger index — later items start their rise slightly further up */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={{ "--reveal-d": delay } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
