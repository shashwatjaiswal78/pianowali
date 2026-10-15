import { cn } from "@/lib/utils";
import { cta, pricing } from "@/content/site";

/* The price, said wherever an enrol button sits on a dark band — so a visitor
 * knows what the button costs without scrolling to the pricing card. Shows
 * the struck-through original while the launch offer runs.
 *
 * Two chunks that each wrap as a unit, so a narrow column breaks between the
 * price and the terms instead of stranding half a phrase on its own line.
 * Pass `justify-*` in className to match the alignment of the button above. */
export function PriceLine({ className }: { className?: string }) {
  const onOffer = Boolean(pricing.offer && pricing.originalPrice);
  return (
    <p
      className={cn(
        "flex flex-wrap justify-center gap-x-2.5 gap-y-0.5 text-[length:var(--text-small)] text-ivory/70",
        className,
      )}
    >
      <span className="whitespace-nowrap">
        <span className="font-bold text-ivory">
          {pricing.currency}
          {pricing.price}
        </span>
        {onOffer && (
          <>
            {" "}
            <s className="text-ivory/60 decoration-rose decoration-2">
              <span className="sr-only">was </span>
              {pricing.currency}
              {pricing.originalPrice}
            </s>
          </>
        )}
        <span className="sr-only">,</span>
      </span>
      <span className="whitespace-nowrap">{cta.reassurance}</span>
    </p>
  );
}
