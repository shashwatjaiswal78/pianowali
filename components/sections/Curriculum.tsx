import { Container } from "@/components/ui/Container";
import { ModuleGrid } from "@/components/ui/ModuleGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { curriculum } from "@/content/site";

/* The curriculum gets a section of its own, on white, so the four coloured
 * module blocks are the loudest thing between the course pitch and the
 * audience section. */
export function Curriculum() {
  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-heading"
      className="bg-ivory py-(--spacing-section)"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <SectionHeading
            id="curriculum-heading"
            eyebrow={curriculum.eyebrow}
            title={curriculum.heading}
            className="max-w-lg"
          />
          <p className="max-w-sm text-[length:var(--text-small)] text-ink-muted">
            {curriculum.note}
          </p>
        </div>

        <ModuleGrid className="mt-10 lg:mt-12" modules={curriculum.modules} />
      </Container>
    </section>
  );
}
