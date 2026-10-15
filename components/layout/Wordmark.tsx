import { cn } from "@/lib/utils";
import { brand } from "@/content/site";

/* The mark reuses the keybed geometry at a small scale: three white keys and
 * two black, which is the shape of the instrument reduced to its minimum. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-7 shrink-0"
        fill="none"
      >
        <rect x="0.5" y="2.5" width="23" height="19" rx="3.5" className="stroke-current opacity-40" />
        <path d="M8.5 3v10M16 3v10" className="stroke-current opacity-30" strokeWidth="1" />
        <rect x="5.5" y="3" width="3.5" height="8" rx="1" className="fill-rose" />
        <rect x="14.5" y="3" width="3.5" height="8" rx="1" className="fill-current opacity-70" />
      </svg>
      <span className="text-[1.0625rem] font-extrabold tracking-[-0.03em]">
        {brand.name}
        <span className="text-rose">.</span>
      </span>
    </span>
  );
}
