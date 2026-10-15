import { Check, Sparkles } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CtaContent } from "@/components/ui/CtaContent";
import { PriceLine } from "@/components/ui/PriceLine";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { closing, contact, cta, faq, pricing } from "@/content/site";

const toNumber = (v: string) => Number(v.replace(/,/g, ""));

export function Convert() {
  const onOffer = Boolean(pricing.offer && pricing.originalPrice);
  const now = `${pricing.currency}${pricing.price}`;
  const was = `${pricing.currency}${pricing.originalPrice ?? ""}`;
  const savings = onOffer
    ? toNumber(pricing.originalPrice ?? "0") - toNumber(pricing.price)
    : 0;

  return (
    <>
      {/* --- Pricing --------------------------------------------------- */}
      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="bg-ivory py-(--spacing-section)"
      >
        <Container>
          <SectionHeading
            id="pricing-heading"
            eyebrow={pricing.eyebrow}
            title={pricing.heading}
            lede={pricing.note}
            align="center"
          />

          <Reveal className="mx-auto mt-12 max-w-3xl lg:mt-14">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-rose bg-navy text-ivory shadow-[var(--shadow-lift)] sm:grid sm:grid-cols-[1fr_1.15fr]">
              {/* Price */}
              <div className="border-b border-line-invert p-8 sm:border-b-0 sm:border-r lg:p-10">
                {onOffer && (
                  <p className="mb-4 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-gold px-3 py-1 text-[length:var(--text-micro)] font-bold tracking-[0.08em] text-navy uppercase">
                    <Sparkles aria-hidden className="size-3.5" strokeWidth={2.25} />
                    {pricing.offerLabel}
                  </p>
                )}
                <h3 className="text-[length:var(--text-h4)] text-ivory">
                  {pricing.planName}
                </h3>
                <p className="mt-1.5 text-[length:var(--text-small)] text-ink-invert-muted">
                  {pricing.summary}
                </p>

                {/* Screen readers don't reliably announce a struck-through
                    price, so the visual row is hidden and this says it plainly */}
                <p className="sr-only">
                  {onOffer
                    ? `${pricing.offerLabel}: ${now}, down from ${was}. ${pricing.offer}.`
                    : `${now}, ${pricing.priceNote.toLowerCase()}.`}
                </p>
                {/* Was, then now: the old price sits small above the new one */}
                <div aria-hidden className="mt-7 flex flex-col items-start gap-3">
                  {onOffer && (
                    /* Cut with a rose slash rather than the browser's thin
                       horizontal line-through */
                    <span className="relative text-[length:var(--text-h3)] leading-none font-bold tracking-[-0.03em] text-ink-invert-muted before:absolute before:inset-x-[-8%] before:top-1/2 before:h-[3px] before:-rotate-[16deg] before:rounded-full before:bg-rose">
                      {was}
                    </span>
                  )}
                  <span className="text-[length:var(--text-display)] leading-none font-extrabold tracking-[-0.05em] text-ivory">
                    {now}
                  </span>
                </div>
                {onOffer ? (
                  <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[length:var(--text-small)] text-gold">
                    {savings > 0 && (
                      <span className="rounded-[var(--radius-pill)] bg-rose-cta px-2.5 py-0.5 font-bold text-ivory">
                        Save {pricing.currency}
                        {savings.toLocaleString("en-IN")}
                      </span>
                    )}
                    {pricing.offer}
                  </p>
                ) : (
                  <p className="mt-2 text-[length:var(--text-small)] text-gold">
                    {pricing.priceNote}
                  </p>
                )}

                <Button
                  href={cta.primaryHref}
                  size="lg"
                  aria-label={`${pricing.ctaLabel} — ${now}, one-time payment`}
                  className="mt-8 w-full rounded-[var(--radius-pill)]"
                >
                  <CtaContent label={pricing.ctaLabel} />
                </Button>
                <p className="mt-3 text-center text-[length:var(--text-small)] text-ink-invert-muted">
                  {cta.reassurance}
                </p>
              </div>

              {/* What's in it */}
              <div className="p-8 lg:p-10">
                <h4 className="text-[length:var(--text-micro)] font-bold tracking-[0.1em] text-ink-invert-muted uppercase">
                  What you get
                </h4>
                <ul className="mt-5 space-y-3.5">
                  {pricing.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check
                        aria-hidden
                        strokeWidth={3}
                        className="mt-1.5 size-4 shrink-0 text-gold"
                      />
                      <span className="text-[length:var(--text-body)] text-ivory/85">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

        </Container>
      </section>

      {/* --- FAQ ------------------------------------------------------- */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-lavender py-(--spacing-section)"
      >
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                id="faq-heading"
                eyebrow={faq.eyebrow}
                title={faq.heading}
              />

              <div className="mt-8 rounded-[var(--radius-card)] border border-line bg-ivory p-6 shadow-[var(--shadow-card)]">
                <h3 className="text-[length:var(--text-h4)]">
                  {faq.contact.title}
                </h3>
                <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-ink-muted">
                  {faq.contact.body}
                </p>
                <Button
                  href={contact.whatsappHref}
                  variant="outline"
                  className="mt-5 w-full rounded-[var(--radius-pill)] sm:w-auto"
                >
                  {faq.contact.ctaLabel}
                </Button>
              </div>

            </div>

            <Accordion
              defaultOpen={0}
              items={faq.items.map((f) => ({ heading: f.q, body: f.a }))}
            />
          </div>
        </Container>
      </section>

      {/* --- Closing --------------------------------------------------- */}
      <section
        aria-labelledby="closing-heading"
        className="on-dark bg-navy py-(--spacing-section) text-ivory"
      >
        <Container className="text-center">
          <SectionHeading
            id="closing-heading"
            eyebrow={closing.eyebrow}
            title={closing.heading}
            lede={closing.body}
            align="center"
            onDark
          />
          <div className="mt-9 flex flex-col items-center gap-4">
            <Button
              href={cta.primaryHref}
              size="lg"
              className="w-full max-w-xs rounded-[var(--radius-pill)] sm:w-auto"
            >
              <CtaContent />
            </Button>
            <PriceLine />
          </div>
        </Container>
      </section>
    </>
  );
}
