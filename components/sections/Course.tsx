import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CtaContent } from "@/components/ui/CtaContent";
import { Container } from "@/components/ui/Container";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { course, cta } from "@/content/site";

export function Course() {
  return (
    <section
      id="course"
      aria-labelledby="course-heading"
      className="bg-ivory py-(--spacing-section)"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — the pitch */}
          <div>
            <SectionHeading
              id="course-heading"
              eyebrow={course.eyebrow}
              title={course.heading}
              lede={course.intro}
            />

            <ul className="mt-8 space-y-3.5">
              {course.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-rose-tint"
                  >
                    <Check className="size-3 text-rose" strokeWidth={3} />
                  </span>
                  <span className="text-ink-muted">{p}</span>
                </li>
              ))}
            </ul>

            <Button
              href={cta.primaryHref}
              size="lg"
              className="mt-9 w-full rounded-[var(--radius-pill)] sm:w-auto"
            >
              <CtaContent />
            </Button>
          </div>

          {/* Right — the artefact */}
          <Reveal delay={1}>
            <figure className="overflow-hidden rounded-[var(--radius-media)] border border-line bg-lavender shadow-[var(--shadow-lift)]">
              {/* Simran's intro clip as the course thumbnail */}
              <LoopVideo
                src={course.video.src}
                poster={course.video.poster}
                label={course.video.label}
                className="aspect-video"
              />
              <figcaption>
                <dl className="grid grid-cols-2 border-t border-line bg-ivory">
                  {course.meta.map((m, i) => (
                    <div
                      key={m.label}
                      className={
                        "px-5 py-4 " +
                        (i % 2 === 1 ? "border-l border-line " : "") +
                        (i > 1 ? "border-t border-line" : "")
                      }
                    >
                      <dt className="text-[length:var(--text-micro)] font-semibold tracking-[0.1em] text-ink-faint uppercase">
                        {m.label}
                      </dt>
                      <dd className="mt-1 font-bold tracking-[-0.02em] text-ink">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
