import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  align = "start",
  onDark,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  id?: string;
  align?: "start" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow
          onDark={onDark}
          className={align === "center" ? "justify-center" : undefined}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        id={id}
        className={cn(
          "text-[length:var(--text-h2)]",
          onDark ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 text-[length:var(--text-lead)] leading-relaxed",
            onDark ? "text-ink-invert-muted" : "text-ink-muted",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
