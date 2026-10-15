import { Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { audience } from "@/content/site";

export function Audience() {
  return (
    <section
      id="audience"
      aria-labelledby="audience-heading"
      className="on-dark bg-burgundy py-(--spacing-section) text-ivory"
    >
      <Container>
        <SectionHeading
          id="audience-heading"
          eyebrow={audience.eyebrow}
          title={audience.heading}
          align="center"
          onDark
        />

        {/* Two matched cards: who it's for (outlined) and what you get out of
            it (solid gold — the payoff). Same type scale and rhythm on both
            sides, equal height. */}
        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          <Reveal className="h-full">
            <div className="h-full rounded-[var(--radius-card)] border border-gold/30 bg-ivory/6 p-7 lg:p-9">
              <h3 className="text-[length:var(--text-h3)] text-ivory">
                {audience.forYou.title}
              </h3>
              <ul className="mt-6 space-y-4">
                {audience.forYou.items.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span
                      aria-hidden
                      className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-gold"
                    >
                      <Check className="size-3 text-burgundy" strokeWidth={3} />
                    </span>
                    <span className="text-ivory/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={1} className="h-full">
            <div className="h-full rounded-[var(--radius-card)] bg-gold p-7 text-navy lg:p-9">
              <h3 className="text-[length:var(--text-h3)]">
                {audience.outcomes.title}
              </h3>
              <ul className="mt-6 space-y-4">
                {audience.outcomes.items.map((o) => (
                  <li key={o} className="flex gap-3.5">
                    <Sparkles
                      aria-hidden
                      className="mt-0.5 size-5 shrink-0"
                      strokeWidth={1.75}
                    />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
