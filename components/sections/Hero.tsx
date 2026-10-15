import Image from "next/image";
import {
  Globe,
  GraduationCap,
  Piano,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CtaContent } from "@/components/ui/CtaContent";
import { Container } from "@/components/ui/Container";
import { PaperCollage } from "@/components/ui/PaperCollage";
import { PriceLine } from "@/components/ui/PriceLine";
import { TornEdge } from "@/components/ui/TornEdge";
import { cta, hero, images } from "@/content/site";

/* Simran's trust badges arrive as emoji in the copy; the design system asks for
 * one consistent line-icon language, so they map to Lucide here. */
const badgeIcons: Record<string, LucideIcon> = { Piano, GraduationCap, Globe };

function Badge({ icon, label }: { icon: string; label: string }) {
  const Icon = badgeIcons[icon];
  return (
    <li className="flex items-center gap-2.5 text-[length:var(--text-small)] font-semibold text-ivory/80">
      <Icon aria-hidden className="size-4.5 shrink-0 text-gold" strokeWidth={1.75} />
      {label}
    </li>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="on-dark relative isolate overflow-hidden bg-navy pt-[calc(var(--header-h)+1.2rem)] text-ivory lg:pt-[calc(var(--header-h)+1.8rem)]"
    >
      <Container className="relative">
        {/* ---- Kicker + headline ----------------------------------------- */}
        <div className="mx-auto max-w-6xl text-center">
          <p className="eyebrow inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-gold/45 px-4 py-1.5 text-gold">
            <span aria-hidden className="size-1.5 rounded-full bg-gold" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-[length:var(--text-display)] text-ivory"
          >
            {/* The lead keeps its dash and always owns line one. Each phrase
                of the emphasis is atomic, so a narrow screen breaks between
                "Zero Se," and "Bina Sheet Music" — never inside either. */}
            <span className="block">{hero.headline.lead}</span>{" "}
            <span className="block text-rose">
              {hero.headline.emphasis.map((phrase, i) => (
                <span key={phrase}>
                  {i > 0 && " "}
                  <span className="inline-block">{phrase}</span>
                </span>
              ))}
            </span>
          </h1>
        </div>
      </Container>

      {/* Everything below the headline. The paper collage is mounted in here,
          not on the whole section, so no fragment can ever sit behind the
          type — whatever the headline's height at a given width. */}
      <div className="relative isolate">
        <PaperCollage className="-z-10" />

        {/* Wider than the reading container: the cut-out is allowed to run
            past the text column so the copy either side keeps a sane measure.
            Three columns only from xl — below ~1280px the side columns drop
            under 150px and the copy sets one word per line, so the stacked
            layout carries on up to there. */}
        <div className="relative mx-auto w-full max-w-[84rem] px-(--spacing-gutter)">
          <div className="mt-8 grid items-end gap-8 lg:mt-10 xl:grid-cols-[1fr_auto_1fr] xl:gap-10">
            {/* Left — copy, with the CTA and its price right under it */}
            <div className="order-2 flex flex-col items-center gap-6 text-center xl:order-1 xl:items-end xl:pb-16 xl:text-right">
              <p className="mx-auto max-w-md text-[length:var(--text-lead)] leading-relaxed text-ivory/80 xl:mr-0">
                {hero.body}
              </p>
              <div className="flex w-full flex-col items-center gap-3 xl:items-end">
                <Button
                  href={cta.primaryHref}
                  size="lg"
                  className="w-full max-w-xs rounded-[var(--radius-pill)] sm:w-auto"
                >
                  <CtaContent />
                </Button>
                <PriceLine className="xl:justify-end" />
              </div>
            </div>

            {/* Centre — the torn-paper cut-out */}
            <div className="order-1 mx-auto w-full max-w-[29rem] sm:max-w-[33rem] xl:order-2 xl:w-[34rem] xl:max-w-none">
              <Image
                src={images.heroPortrait.src}
                alt={images.heroPortrait.alt}
                width={1084}
                height={767}
                priority
                sizes="(max-width: 640px) 94vw, (max-width: 1280px) 33rem, 34rem"
                className="w-full drop-shadow-[0_10px_26px_rgb(0_0_0/0.45)]"
              />
            </div>

            {/* Right — credentials, from xl. Below that they run as a row
                under everything (see the list after this grid). */}
            <ul className="order-3 hidden flex-col gap-4 xl:flex xl:pb-16">
              {hero.badges.map((b) => (
                <Badge key={b.label} {...b} />
              ))}
            </ul>
          </div>
        </div>

        <Container className="relative">
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pb-12 sm:gap-x-12 lg:pb-[3.6rem] xl:hidden">
            {hero.badges.map((b) => (
              <Badge key={b.label} {...b} />
            ))}
          </ul>
          <div aria-hidden className="hidden h-12 xl:block" />
        </Container>
      </div>

      {/* The hero tears away to reveal the section beneath. Hung 1px past the
          bottom: the hero's height is usually fractional, and flush to the
          edge the last pixel row only half-covered the navy behind it — a
          dark hairline on retina screens. The hero clips the overhang. */}
      <TornEdge className="absolute inset-x-0 -bottom-px" />
    </section>
  );
}
