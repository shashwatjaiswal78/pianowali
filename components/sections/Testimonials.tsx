import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoWall } from "@/components/ui/VideoWall";
import { testimonials } from "@/content/site";

/* Social proof: students' own progress videos, then written reviews once
 * there are some. No star ratings — every quote stands on its own, and none
 * of it is a rating anyone gave. */
export function Testimonials() {
  const { videos, items } = testimonials;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="bg-lavender py-(--spacing-section)"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHeading
            id="reviews-heading"
            eyebrow={testimonials.eyebrow}
            title={testimonials.heading}
            lede={testimonials.body}
          />
          <Button
            href={testimonials.ctaHref}
            variant="outline"
            size="lg"
            className="w-full rounded-[var(--radius-pill)] sm:w-auto"
          >
            <InstagramIcon className="size-4.5" />
            {testimonials.ctaLabel}
            <ArrowUpRight aria-hidden className="size-4.5" />
          </Button>
        </div>

        {videos.length > 0 && (
          <Reveal className="mt-10 lg:mt-12">
            <VideoWall videos={videos} />
          </Reveal>
        )}

        {items.length > 0 && (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {items.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i % 3}>
                <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-ivory p-6 shadow-[var(--shadow-card)]">
                  <blockquote className="flex-1 text-ink">
                    <p className="leading-relaxed">{t.quote}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-lavender">
                      <Image src={t.avatar} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-bold tracking-[-0.02em] text-ink">
                        {t.name}
                      </span>
                      <span className="block truncate text-[length:var(--text-small)] text-ink-muted">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
