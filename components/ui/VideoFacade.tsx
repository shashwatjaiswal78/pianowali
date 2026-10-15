"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/* Renders a poster frame and only mounts the YouTube iframe once the visitor
 * asks for it. Keeps a third-party player off the critical path entirely. */
export function VideoFacade({
  videoId,
  poster,
  alt,
  label,
  className,
  priority,
}: {
  videoId: string;
  poster: string;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-[var(--radius-media)] bg-navy shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={label}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          <Image
            src={poster}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority={priority}
            className="object-cover transition-opacity duration-[var(--dur-base)] group-hover:opacity-90"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose text-ivory shadow-[var(--shadow-rose)] transition-colors duration-[var(--dur-base)] group-hover:bg-rose-hover sm:size-20"
          >
            <Play className="ml-1 size-6 fill-current sm:size-7" strokeWidth={1.5} />
          </span>
        </button>
      )}
    </div>
  );
}
