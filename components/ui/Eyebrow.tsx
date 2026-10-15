import { cn } from "@/lib/utils";

/* The eyebrow borrows the idiom of an engraved tempo marking on sheet music:
 * lowercase, italic serif, set small above the heading it qualifies. */
export function Eyebrow({
  children,
  className,
  onDark,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p
      className={cn(
        "eyebrow mb-3 flex items-center gap-2.5",
        onDark && "text-gold",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-px w-8 shrink-0",
          onDark ? "bg-gold/50" : "bg-rose-text/45",
        )}
      />
      {children}
    </p>
  );
}
