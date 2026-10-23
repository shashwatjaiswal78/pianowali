import { cn } from "@/lib/utils";
import { brand } from "@/content/site";

/* Simran's SJ monogram — the letters standing on three piano keys — beside
 * the site name, PianoWali. The mark is a transparent PNG used as a CSS mask, so it takes the
 * current text colour: white on the dark header and footer, navy elsewhere.
 *
 * Cut from the closing card of her intro video (1080p). If a vector original
 * (SVG / AI / EPS) turns up, swap it in at /images/sj-mark — same shape, same
 * mask, crisper at large sizes. */
const mark = {
  maskImage: "url(/images/sj-mark.png)",
  WebkitMaskImage: "url(/images/sj-mark.png)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
} as const;

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* 319×433 source, so 36px tall is ~26.5px wide */}
      <span aria-hidden className="block h-9 w-[1.66rem] shrink-0 bg-current" style={mark} />
      <span className="text-[1.0625rem] font-extrabold tracking-[-0.03em]">
        {brand.siteName}
        <span className="text-rose">.</span>
      </span>
    </span>
  );
}
