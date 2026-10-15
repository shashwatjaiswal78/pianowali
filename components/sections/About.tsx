import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { about, images } from "@/content/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-lavender py-(--spacing-section)"
    >
      <Container>
        <SectionHeading
          id="about-heading"
          eyebrow={about.eyebrow}
          title={about.heading}
          align="center"
        />

        {/* The intro video, once there is one. Until then the slot is left
            out entirely: a still that looks like a player but does nothing,
            showing someone who isn't Simran, did more harm than an empty
            space. Setting `about.videoId` brings the player back. */}
        {about.videoId && (
          <Reveal className="mx-auto mt-10 max-w-3xl lg:mt-12">
            <VideoFacade
              videoId={about.videoId}
              poster={images.introPoster.src}
              alt={images.introPoster.alt}
              label={about.videoLabel}
            />
          </Reveal>
        )}

        <Reveal delay={2} className="mx-auto mt-10 max-w-2xl">
          <div className="text-[length:var(--text-lead)] leading-relaxed text-ink-muted">
            <p>{about.bio[0]}</p>
            {/* Native disclosure: works with no JavaScript, and the text stays
                in the page for search engines and find-in-page. */}
            <details className="group mt-4">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-[length:var(--text-body)] font-semibold text-rose-text transition-colors duration-[var(--dur-fast)] hover:text-rose-hover [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">{about.readMoreLabel}</span>
                <span className="hidden group-open:inline">Show less</span>
                <ChevronDown
                  aria-hidden
                  className="size-4.5 transition-transform duration-[var(--dur-base)] group-open:rotate-180"
                />
              </summary>
              <div className="animate-panel-drop mt-2 space-y-4">
                {about.bio.slice(1).map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </details>
          </div>

          <figure className="relative mt-10 border-l-2 border-rose pl-6 sm:pl-8">
            <blockquote>
              <p className="text-[length:var(--text-h3)] leading-snug font-bold tracking-[-0.02em] text-ink">
                {about.pullQuote}
              </p>
            </blockquote>
            <figcaption className="eyebrow mt-4 text-ink-faint">
              {about.signature}
            </figcaption>
          </figure>
        </Reveal>

        {/* Stat band */}
        <Reveal delay={3}>
          <dl className="mt-14 grid grid-cols-2 overflow-hidden rounded-[var(--radius-card)] border border-line bg-ivory shadow-[var(--shadow-card)] lg:mt-18 lg:grid-cols-4">
            {about.stats.map((s, i) => (
              /* dt first in the markup, as a <dl> requires; flex-col-reverse
                 puts the figure on top visually. No count-up: a credibility
                 figure that reads "6+" mid-animation is a wrong claim. */
              <div
                key={s.label}
                className={
                  "flex flex-col-reverse px-5 py-7 text-center lg:px-6 lg:py-9 " +
                  (i % 2 === 1 ? "border-l border-line " : "") +
                  (i > 1 ? "border-t border-line lg:border-t-0 " : "") +
                  (i > 0 ? "lg:border-l lg:border-line" : "")
                }
              >
                <dt className="mt-1.5 text-[length:var(--text-small)] font-medium text-ink-muted">
                  {s.label}
                </dt>
                <dd className="text-[length:var(--text-h2)] font-extrabold tracking-[-0.04em] text-ink tabular-nums">
                  {s.value}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
