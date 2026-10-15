"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type Module = { title: string; count: string; lessons: string[] };

/* ---------------------------------------------------------------------------
 * MODULE GRID — the curriculum as four solid blocks, stacked 01 to 04.
 *
 * Each module is a block in one of the four brand colours, alternating light
 * and dark so no two neighbours blur together. Clicking a block drops its
 * lesson list open directly beneath it, with a caret pointing down into it.
 *
 * On phones a block is a tall card: number and label on top, title, then the
 * lesson count. From md it becomes one long horizontal bar — the two inner
 * rows dissolve (`display: contents`) and their pieces sit on a grid: the big
 * number on the left, the label over the title, count and chevron on the
 * right.
 *
 * Every small text pairing clears 4.5:1: ivory on rose-cta 4.82, ivory on
 * navy and burgundy well above, navy on gold 11.9.
 * -------------------------------------------------------------------------*/
const tones = [
  { block: "bg-rose-cta text-ivory", num: "text-ivory", fill: "bg-rose-cta text-ivory", icon: "bg-ivory/15" },
  { block: "bg-navy text-ivory", num: "text-rose", fill: "bg-navy text-ivory", icon: "bg-ivory/10" },
  { block: "bg-gold text-navy", num: "text-navy", fill: "bg-gold text-navy", icon: "bg-navy/10" },
  { block: "bg-burgundy text-ivory", num: "text-gold", fill: "bg-burgundy text-ivory", icon: "bg-ivory/10" },
] as const;

/* Matches the block colours, for the caret that joins block to panel */
const caretFill = ["bg-rose-cta", "bg-navy", "bg-gold", "bg-burgundy"] as const;

export function ModuleGrid({
  modules,
  defaultOpen = 0,
  className,
}: {
  modules: Module[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  // Lessons are numbered across the whole course, 1–23, so each block can say
  // where it sits in the sequence.
  const starts = modules.reduce<number[]>(
    (acc, m, i) => [...acc, i === 0 ? 1 : acc[i - 1] + modules[i - 1].lessons.length],
    [],
  );

  return (
    <div className={cn("grid gap-4", className)}>
      {modules.map((m, i) => {
        const tone = tones[i % tones.length];
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;
        const first = starts[i];
        const last = first + m.lessons.length - 1;
        const num = String(i + 1).padStart(2, "0");

        return (
          <div key={m.title} className="contents">
            {/* ---- Block ---------------------------------------------- */}
            <div className="relative">
              <h3 className="m-0 h-full">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={cn(
                    "group relative flex h-full w-full cursor-pointer flex-col rounded-[var(--radius-media)] p-6 text-left",
                    "transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out-soft)]",
                    "hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] md:hover:-translate-y-0.5",
                    // Horizontal bar: number | label over title | count | chevron
                    "md:grid md:grid-cols-[auto_1fr_auto_auto] md:grid-rows-[auto_auto] md:items-center md:gap-x-8 md:px-8 md:py-6 lg:gap-x-10 lg:px-10 lg:py-7",
                    tone.block,
                    isOpen && "shadow-[var(--shadow-lift)]",
                  )}
                >
                  <span className="flex items-start justify-between gap-4 md:contents">
                    <span
                      aria-hidden
                      className={cn(
                        "text-[3.25rem] leading-none font-extrabold tracking-[-0.05em] tabular-nums md:col-start-1 md:row-span-2 md:row-start-1 md:min-w-24 lg:text-[4.25rem]",
                        tone.num,
                      )}
                    >
                      {num}
                    </span>
                    <span className="mt-1 text-[length:var(--text-micro)] font-bold tracking-[0.12em] uppercase md:col-start-2 md:row-start-1 md:mt-0 md:self-end">
                      <span className="sr-only">Module {num}</span>
                      <span aria-hidden>Module</span>
                    </span>
                  </span>

                  <span className="mt-6 block text-[length:var(--text-h3)] leading-tight font-extrabold tracking-[-0.025em] md:col-start-2 md:row-start-2 md:mt-1 md:self-start">
                    {m.title}
                  </span>

                  <span className="mt-4 flex items-center justify-between gap-3 md:contents">
                    <span className="text-[length:var(--text-small)] font-semibold md:col-start-3 md:row-span-2 md:row-start-1 md:text-right">
                      {m.count}
                      <span aria-hidden> · </span>
                      <span className="sr-only">, </span>
                      {first === last ? `Lesson ${first}` : `Lessons ${first}–${last}`}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-soft)] md:col-start-4 md:row-span-2 md:row-start-1 md:size-11",
                        tone.icon,
                        isOpen && "rotate-180",
                      )}
                    >
                      <ChevronDown className="size-4.5" strokeWidth={2.25} />
                    </span>
                  </span>
                </button>
              </h3>

              {/* Caret joining the open block to its panel */}
              {isOpen && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-2 left-1/2 size-4 -translate-x-1/2 rotate-45 rounded-[2px] md:left-20 lg:left-22",
                    caretFill[i % caretFill.length],
                  )}
                />
              )}
            </div>

            {/* ---- Panel ----------------------------------------------- */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="animate-panel-drop"
            >
              <div className="rounded-[var(--radius-media)] border border-line bg-lavender p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="eyebrow">
                    Module {num} · {m.title}
                  </p>
                  <p className="text-[length:var(--text-small)] font-medium text-ink-muted">
                    {m.count}
                  </p>
                </div>
                <ol className="mt-6 gap-x-12 md:columns-2">
                  {m.lessons.map((lesson, n) => (
                    <li
                      key={lesson}
                      className="mb-3.5 flex break-inside-avoid items-start gap-3.5"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "grid h-7 min-w-9 shrink-0 place-items-center rounded-[var(--radius-btn)] px-1.5 text-[length:var(--text-micro)] font-bold tabular-nums",
                          tone.fill,
                        )}
                      >
                        {String(first + n).padStart(2, "0")}
                      </span>
                      <span className="pt-0.5 leading-relaxed text-ink">{lesson}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
