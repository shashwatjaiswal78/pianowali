import Image from "next/image";
import { Ear, Hand, KeyRound, Route, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { featureIcons, type FeatureIconName } from "@/components/ui/FeatureIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits, images, inside } from "@/content/site";

/* "Why it works" keeps line icons; "What's included" uses the custom set */
const icons: Record<string, LucideIcon> = { Ear, Hand, KeyRound, Route };

/* Icon tiles cycle the brand colours, as the curriculum blocks do. Each sets
 * the tile colour (also used for the icon's knock-outs) and the accent tone. */
const tileTones = [
  { tile: "bg-rose-cta text-ivory", bg: "var(--color-rose-cta)", accent: "var(--color-gold)" },
  { tile: "bg-navy text-ivory", bg: "var(--color-navy)", accent: "var(--color-rose)" },
  { tile: "bg-gold text-navy", bg: "var(--color-gold)", accent: "var(--color-rose-cta)" },
] as const;

export function CourseDetail() {
  return (
    <section
      id="included"
      aria-labelledby="inside-heading"
      className="bg-lavender py-(--spacing-section)"
    >
      <Container>
        {/* 4a — What's inside */}
        <SectionHeading
          id="inside-heading"
          eyebrow={inside.eyebrow}
          title={inside.heading}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {inside.items.map((item, i) => {
            const Icon = featureIcons[item.icon as FeatureIconName];
            const tone = tileTones[i % tileTones.length];
            return (
              <Reveal as="li" key={item.title} delay={i}>
                {/* Centred: the icon tile on top, the text beneath */}
                <div className="group flex h-full flex-col items-center rounded-[var(--radius-card)] border border-line bg-ivory px-6 py-8 text-center shadow-[var(--shadow-card)] transition-colors duration-[var(--dur-base)] hover:border-rose/35 lg:px-7 lg:py-9">
                  <span
                    aria-hidden
                    style={{ "--icon-bg": tone.bg, "--icon-accent": tone.accent } as React.CSSProperties}
                    className={
                      "grid size-18 place-items-center rounded-[1.25rem] shadow-[var(--shadow-card)] transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:-rotate-6 " +
                      tone.tile
                    }
                  >
                    <Icon className="size-10" />
                  </span>
                  <h3 className="mt-6 text-[length:var(--text-h4)]">{item.title}</h3>
                  <p className="mt-2 max-w-xs text-[length:var(--text-body)] leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        {/* 4b — Why it works, paired with a piano frame */}
        <div className="mt-20 grid items-center gap-12 lg:mt-28 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius-media)] border border-line shadow-[var(--shadow-lift)]">
              <Image
                src={images.whyItWorks.src}
                alt={images.whyItWorks.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow={benefits.eyebrow} title={benefits.heading} />
            <ul className="mt-9 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {benefits.items.map((b) => {
                const Icon = icons[b.icon];
                return (
                  <li key={b.title}>
                    <Icon
                      aria-hidden
                      className="size-6 text-rose"
                      strokeWidth={1.75}
                    />
                    <h3 className="mt-3.5 text-[length:var(--text-h4)]">{b.title}</h3>
                    <p className="mt-1.5 text-[length:var(--text-body)] leading-relaxed text-ink-muted">
                      {b.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </Container>
    </section>
  );
}
