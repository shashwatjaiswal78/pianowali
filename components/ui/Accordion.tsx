"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { heading: string; body: string };

/* A single-open disclosure list. Used by the FAQ; the curriculum has its own
 * block layout in ModuleGrid. */
export function Accordion({
  items,
  defaultOpen = null,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;

        return (
          <div key={item.heading}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full cursor-pointer items-center gap-4 py-5 text-left transition-colors duration-[var(--dur-fast)] hover:text-rose-hover"
              >
                <span className="flex-1 text-[length:var(--text-h4)] font-bold tracking-[-0.015em]">
                  {item.heading}
                </span>
                <Plus
                  aria-hidden
                  strokeWidth={2}
                  className={cn(
                    "size-5 shrink-0 text-ink-faint transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-soft)]",
                    isOpen && "rotate-45 text-rose",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="animate-panel-drop"
            >
              <p className="pb-6 text-ink-muted">{item.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
