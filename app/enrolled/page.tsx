import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Keybed } from "@/components/ui/Keybed";
import { Wordmark } from "@/components/layout/Wordmark";
import { brand, contact, enrolled } from "@/content/site";

export const metadata: Metadata = {
  title: `${enrolled.heading} — ${brand.siteName}`,
  robots: { index: false, follow: false },
};

/* Where Razorpay sends buyers after paying. It holds nothing secret — the
 * course link arrives by email — so landing here without paying gives
 * nothing away. */
export default function EnrolledPage() {
  return (
    <>
      <header className="on-dark bg-navy text-ivory">
        <Container className="flex h-16 items-center lg:h-[4.5rem]">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center transition-opacity hover:opacity-80"
            aria-label={`${brand.siteName} — home`}
          >
            <Wordmark />
          </Link>
        </Container>
        <Keybed tone="muted" className="h-2.5" />
      </header>

      <main id="main" className="bg-lavender py-(--spacing-section)">
        <Container className="max-w-2xl">
          <Eyebrow>{enrolled.eyebrow}</Eyebrow>
          <h1 className="text-[length:var(--text-h2)] text-ink">{enrolled.heading}</h1>
          <p className="mt-4 text-[length:var(--text-lead)] leading-relaxed text-ink-muted">
            {enrolled.body}
          </p>

          <ol className="mt-8 space-y-4 rounded-[var(--radius-card)] border border-line bg-ivory p-6 lg:p-8">
            {enrolled.steps.map((step, i) => (
              <li key={step} className="flex gap-4 text-[length:var(--text-body)] leading-relaxed text-ink">
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-rose-soft text-[length:var(--text-small)] font-bold text-navy tabular-nums"
                >
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 border-t border-line pt-8">
            <h2 className="text-[length:var(--text-h4)] text-ink">{enrolled.help.title}</h2>
            <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-ink-muted">
              {enrolled.help.body}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={contact.whatsappHref} variant="outline">
                <MessageCircle aria-hidden className="size-4.5" />
                {enrolled.help.ctaLabel}
              </Button>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 text-[length:var(--text-small)] font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                <ArrowLeft aria-hidden className="size-4" />
                {enrolled.backLabel}
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
