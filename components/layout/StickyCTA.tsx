"use client";

import { Button } from "@/components/ui/Button";
import { CtaContent } from "@/components/ui/CtaContent";
import { useStickyCtaVisible } from "@/components/layout/useStickyCta";
import { cta, pricing } from "@/content/site";

/* Appears on small screens only, once the hero has scrolled away, and steps
 * aside before the pricing section so it never covers the real buttons. */
export function StickyCTA() {
  const show = useStickyCtaVisible();

  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ivory/95 backdrop-blur-md transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-soft)] lg:hidden " +
        (show ? "translate-y-0" : "translate-y-full")
      }
      aria-hidden={!show}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="min-w-0">
          <p className="flex items-baseline gap-2 truncate text-[length:var(--text-small)] font-bold text-ink">
            {pricing.currency}
            {pricing.price}
            {pricing.offer && pricing.originalPrice && (
              <s className="text-[length:var(--text-micro)] font-semibold text-ink-faint decoration-rose decoration-2">
                <span className="sr-only">was </span>
                {pricing.currency}
                {pricing.originalPrice}
              </s>
            )}
          </p>
          <p className="truncate text-[length:var(--text-small)] text-ink-muted">
            {pricing.offer ? pricing.offerLabel : pricing.priceNote}
            {/* Only where it fits whole; at 375px it would be cut mid-word */}
            <span className="hidden min-[400px]:inline"> · Lifetime access</span>
          </p>
        </div>
        <Button
          href={cta.primaryHref}
          className="shrink-0 rounded-[var(--radius-pill)]"
          tabIndex={show ? undefined : -1}
        >
          <CtaContent label={cta.navLabel} />
        </Button>
      </div>
    </div>
  );
}
