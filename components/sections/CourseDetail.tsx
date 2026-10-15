import Image from "next/image";
import {
  Award,
  CalendarDays,
  Ear,
  Hand,
  Infinity as InfinityIcon,
  KeyRound,
  MessageCircle,
  Music4,
  PlayCircle,
  Route,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits, images, inside } from "@/content/site";

const icons: Record<string, LucideIcon> = {
  Award,
  CalendarDays,
  Ear,
  Hand,
  Infinity: InfinityIcon,
  KeyRound,
  MessageCircle,
  Music4,
  PlayCircle,
  Route,
};

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

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-3">
          {inside.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={i}>
                {/* A row on phones (icon beside the text) so six cards don't
                    take six screens; a stacked card from sm. */}
                <div className="flex h-full gap-4 rounded-[var(--radius-card)] border border-line bg-ivory p-5 shadow-[var(--shadow-card)] transition-colors duration-[var(--dur-base)] hover:border-rose/35 sm:block sm:p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-btn)] bg-rose-tint text-rose sm:size-11">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-[length:var(--text-h4)] sm:mt-5">{item.title}</h3>
                    <p className="mt-1 text-[length:var(--text-body)] leading-relaxed text-ink-muted sm:mt-2">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        {/* 4b — Why it works, paired with a piano frame */}
        <div className="mt-20 grid items-center gap-12 lg:mt-28 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-4/3 overflow-hidden rounded-[var(--radius-media)] border border-line shadow-[var(--shadow-lift)]">
              <Image
                src={images.keysWarm.src}
                alt={images.keysWarm.alt}
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
