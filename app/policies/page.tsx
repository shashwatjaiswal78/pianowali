import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Keybed } from "@/components/ui/Keybed";
import { Wordmark } from "@/components/layout/Wordmark";
import { brand } from "@/content/site";
import { business, policies } from "@/content/policies";

export const metadata: Metadata = {
  title: `${policies.title} — ${brand.siteName}`,
  description: policies.lede,
  alternates: { canonical: "/policies" },
};

/* All five policies on one page, reached only from the small link at the
 * bottom of the footer. Deliberately plain: a document to read, with a
 * contents list that stays in view on wide screens. */
export default function PoliciesPage() {
  const toc = [
    ...policies.sections.map((s) => ({ id: s.id, title: s.title })),
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <>
      <header className="on-dark bg-navy text-ivory">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center transition-opacity hover:opacity-80"
            aria-label={`${brand.siteName} — home`}
          >
            <Wordmark />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-[length:var(--text-small)] font-semibold text-ink-invert-muted transition-colors duration-[var(--dur-fast)] hover:text-ivory"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back to the course
          </Link>
        </Container>
        <Keybed tone="muted" className="h-2.5" />
      </header>

      <main id="main">
        <section className="bg-lavender py-(--spacing-section)">
          <Container>
            <Eyebrow>{policies.eyebrow}</Eyebrow>
            <h1 className="text-[length:var(--text-h2)] text-ink">{policies.title}</h1>
            <p className="mt-4 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-ink-muted">
              {policies.lede}
            </p>
            <p className="mt-4 text-[length:var(--text-small)] text-ink-faint">
              Last updated {business.lastUpdated}
            </p>
          </Container>
        </section>

        <div className="bg-ivory py-(--spacing-section)">
          <Container className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
            {/* Contents */}
            <nav aria-label="On this page" className="lg:sticky lg:top-8 lg:self-start">
              <p className="text-[length:var(--text-micro)] font-bold tracking-[0.1em] text-ink-muted uppercase">
                On this page
              </p>
              <ol className="mt-3 space-y-0.5 border-l border-line">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="-ml-px flex min-h-11 items-center gap-3 border-l-2 border-transparent pl-4 text-[length:var(--text-small)] font-medium text-ink-muted transition-colors duration-[var(--dur-fast)] hover:border-rose hover:text-ink"
                    >
                      <span aria-hidden className="w-4 text-ink-faint tabular-nums">
                        {i + 1}
                      </span>
                      {t.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* The policies */}
            <article className="max-w-3xl">
              {policies.sections.map((s, si) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-heading`}
                  className="scroll-mt-8 border-t border-line pt-10 first:border-t-0 first:pt-0 [&+&]:mt-12"
                >
                  <h2
                    id={`${s.id}-heading`}
                    className="text-[length:var(--text-h3)] text-ink"
                  >
                    <span className="mr-2 text-rose-text tabular-nums">{si + 1}.</span>
                    {s.title}
                  </h2>
                  {s.intro && (
                    <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-ink-muted">
                      {s.intro}
                    </p>
                  )}
                  {s.blocks.map((b, bi) => (
                    <div key={bi} className="mt-7">
                      {b.h && (
                        <h3 className="text-[length:var(--text-h4)] text-ink">
                          <span className="mr-1.5 text-ink-faint tabular-nums">
                            {si + 1}.{bi + 1}
                          </span>{" "}
                          {b.h}
                        </h3>
                      )}
                      {b.p?.map((para) => (
                        <p
                          key={para.slice(0, 32)}
                          className="mt-2.5 text-[length:var(--text-body)] leading-relaxed text-ink-muted"
                        >
                          {para}
                        </p>
                      ))}
                      {b.ul && (
                        <ul className="mt-3 space-y-2.5">
                          {b.ul.map((item) => (
                            <li
                              key={item.slice(0, 32)}
                              className="flex gap-3 text-[length:var(--text-body)] leading-relaxed text-ink-muted"
                            >
                              <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-rose" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              ))}

              {/* Contact — what Razorpay's review looks for */}
              <section
                id="contact"
                aria-labelledby="contact-heading"
                className="mt-12 scroll-mt-8 border-t border-line pt-10"
              >
                <h2 id="contact-heading" className="text-[length:var(--text-h3)] text-ink">
                  <span className="mr-2 text-rose-text tabular-nums">
                    {policies.sections.length + 1}.
                  </span>
                  Contact Us
                </h2>
                <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-ink-muted">
                  For questions about the Course, your payment, a refund or your
                  personal information, get in touch:
                </p>
                <dl className="mt-6 grid gap-x-8 gap-y-5 rounded-[var(--radius-card)] border border-line bg-lavender p-6 sm:grid-cols-2 lg:p-8">
                  {[
                    ["Name", business.legalName],
                    ["Email", business.email],
                    ["Phone / WhatsApp", business.phone],
                    ["Address", business.address],
                    ["Instagram", `@${business.instagram}`],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[length:var(--text-micro)] font-bold tracking-[0.1em] text-ink-faint uppercase">
                        {label}
                      </dt>
                      <dd className="mt-1 font-semibold text-ink">
                        {label === "Email" ? (
                          <a href={`mailto:${value}`} className="underline decoration-rose/40 underline-offset-2 hover:decoration-rose">
                            {value}
                          </a>
                        ) : label === "Instagram" ? (
                          <a
                            href={`https://instagram.com/${business.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-rose/40 underline-offset-2 hover:decoration-rose"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </article>
          </Container>
        </div>
      </main>

      <footer className="on-dark bg-navy text-ink-invert-muted">
        <Container className="flex flex-col gap-3 py-8 text-[length:var(--text-small)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.legalName}. All rights reserved.
          </p>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-gold">
            <ArrowLeft aria-hidden className="size-4" />
            Back to the course
          </Link>
        </Container>
      </footer>
    </>
  );
}
