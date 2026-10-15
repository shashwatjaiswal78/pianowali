import { ArrowRight } from "lucide-react";
import { cta } from "@/content/site";

/* The inside of every primary enrol button: the label and an arrow. */
export function CtaContent({ label = cta.primaryLabel }: { label?: string }) {
  return (
    <>
      {label}
      <ArrowRight aria-hidden className="size-4.5" />
    </>
  );
}
