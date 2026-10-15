import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "gold";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold cursor-pointer " +
  "rounded-[var(--radius-btn)] transition-colors duration-[var(--dur-base)] " +
  "ease-[var(--ease-out-soft)] whitespace-nowrap select-none";

/* Brand rose is 3.99:1 against white — short of AA for button-sized text — so
 * the filled button uses the deeper `rose-cta` variant. Visually it reads as
 * the same rose; numerically it clears 4.5:1. */
const variants: Record<Variant, string> = {
  primary:
    "bg-rose-cta text-ivory shadow-[var(--shadow-rose)] hover:bg-rose-hover active:bg-rose-press",
  outline:
    "border border-line-strong bg-ivory text-ink hover:bg-lavender hover:border-ink-faint",
  ghost:
    "border border-line-invert bg-ivory/5 text-ivory hover:bg-ivory/12 backdrop-blur-sm",
  gold: "bg-gold text-navy hover:bg-gold/85 active:bg-gold/75",
};

/* Minimum 44px touch target on every size. */
const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-7 text-base",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  tabIndex?: number;
  "aria-label"?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = external ?? /^https?:/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
