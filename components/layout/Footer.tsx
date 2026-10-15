import {
  InstagramIcon,
  YoutubeIcon,
  WhatsappIcon,
} from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/Container";
import { Keybed } from "@/components/ui/Keybed";
import { Wordmark } from "@/components/layout/Wordmark";
import { brand, footer } from "@/content/site";

const socialIcons = {
  Instagram: InstagramIcon,
  Youtube: YoutubeIcon,
  MessageCircle: WhatsappIcon,
} as const;

export function Footer() {
  // Only legal pages that exist; never a dead "#"
  const legal = footer.legal.filter(
    (l): l is { label: string; href: string } => Boolean(l.href),
  );

  return (
    <footer className="on-dark bg-navy text-ink-invert-muted">
      <Keybed className="h-2.5" />
      <Container className="py-[2.4rem] lg:py-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div className="max-w-sm">
            <Wordmark className="text-ivory" />
            <p className="mt-4 text-[length:var(--text-small)] leading-relaxed">
              {footer.blurb}
            </p>
            <ul className="mt-6 flex items-center gap-2">
              {footer.socials.map((s) => {
                const Icon = socialIcons[s.icon as keyof typeof socialIcons];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-11 place-items-center rounded-[var(--radius-btn)] border border-line-invert text-ivory transition-colors duration-[var(--dur-fast)] hover:border-gold hover:text-gold"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-[length:var(--text-small)]">
              {footer.socialNote}
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[length:var(--text-small)] font-bold tracking-[0.08em] text-ivory uppercase">
                {col.title}
              </h2>
              {/* 44px rows: the same rhythm as before, as full touch targets */}
              <ul className="mt-3 space-y-0.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(/^https?:/.test(l.href)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex min-h-11 items-center text-[0.9375rem] transition-colors duration-[var(--dur-fast)] hover:text-gold"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-invert pt-6 text-[length:var(--text-small)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
          </p>
          {legal.length > 0 && (
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legal.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center transition-colors duration-[var(--dur-fast)] hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
