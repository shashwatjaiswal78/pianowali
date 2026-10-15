"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/Button";
import { CtaContent } from "@/components/ui/CtaContent";
import { PriceLine } from "@/components/ui/PriceLine";
import { Keybed } from "@/components/ui/Keybed";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/layout/Wordmark";
import { useStickyCtaVisible } from "@/components/layout/useStickyCta";
import { announcement, brand, contact, cta, nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const stickyShowing = useStickyCtaVisible();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile sheet is open: close on Escape, lock the page behind
  // it, and make everything else inert — so Tab and screen readers stay in
  // the dialog, as `aria-modal` promises. On close, focus returns to the
  // button that opened it.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const opener = menuButtonRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    const madeInert = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && !el.inert && !(menu && el.contains(menu)),
    );
    madeInert.forEach((el) => (el.inert = true));

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      madeInert.forEach((el) => (el.inert = false));
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
    {/* Once the page scrolls, the whole header slides up by the height of
        the announcement bar, so only the nav and keybed stay pinned. The bar
        is held to one line (2.25rem) at every width so that offset is exact. */}
    <header
      className={cn(
        "on-dark fixed inset-x-0 top-0 z-30 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-soft)]",
        scrolled && "-translate-y-9",
      )}
    >
      {/* Announcement */}
      <div className="bg-burgundy text-ivory">
        <Container className="flex h-9 items-center justify-center gap-2 text-center text-[length:var(--text-small)] whitespace-nowrap">
          <span className="truncate text-ivory/85">
            <span className="sm:hidden">{announcement.short}</span>
            <span className="hidden sm:inline">{announcement.text}</span>
          </span>
          <a
            href={announcement.href}
            tabIndex={scrolled ? -1 : undefined}
            className="inline-flex h-9 shrink-0 items-center gap-0.5 font-semibold text-gold underline decoration-gold/40 underline-offset-2 transition-colors hover:decoration-gold"
          >
            {announcement.linkLabel}
            <ArrowRight aria-hidden className="size-3.5" />
          </a>
        </Container>
      </div>

      {/* Nav */}
      <div
        className={cn(
          "border-b transition-colors duration-[var(--dur-base)]",
          scrolled
            ? "border-line-invert bg-navy/92 backdrop-blur-md"
            : "border-transparent bg-navy",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <a
            href="#top"
            className="inline-flex min-h-11 shrink-0 items-center text-ivory transition-opacity hover:opacity-80"
            aria-label="Simran — back to top"
          >
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink-invert-muted transition-colors duration-[var(--dur-fast)] hover:text-ivory"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={cta.primaryHref}
              className={cn(
                "rounded-[var(--radius-pill)]",
                stickyShowing && "max-lg:hidden",
              )}
            >
              {cta.navLabel}
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-haspopup="dialog"
              className="grid size-11 cursor-pointer place-items-center rounded-[var(--radius-btn)] text-ivory transition-colors hover:bg-ivory/10 lg:hidden"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </Container>
      </div>

      {/* Signature: the keybed reads out scroll progress */}
      <Keybed progress={progress} tone="muted" className="h-2.5" />

    </header>

      {/* Mobile sheet — outside <header>: the header is transformed when
          scrolled, and a transformed ancestor would trap this fixed sheet. */}
      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="on-dark fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy lg:hidden"
        >
          <Container className="flex h-16 items-center justify-between">
            <Wordmark className="text-ivory" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              autoFocus
              className="grid size-11 cursor-pointer place-items-center rounded-[var(--radius-btn)] text-ivory transition-colors hover:bg-ivory/10"
            >
              <X aria-hidden className="size-5" />
            </button>
          </Container>
          <Container>
            <nav aria-label="Mobile">
              <ul className="mt-6 flex flex-col divide-y divide-line-invert border-y border-line-invert">
                {nav.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center text-[length:var(--text-h3)] font-bold text-ivory"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Button
              href={cta.primaryHref}
              size="lg"
              className="mt-8 w-full rounded-[var(--radius-pill)]"
            >
              <CtaContent />
            </Button>
            <PriceLine className="mt-3 text-center" />
          </Container>

          {/* The lower half of the sheet: where to find Simran */}
          <Container className="mt-auto pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <div className="flex flex-wrap items-center gap-3 border-t border-line-invert pt-6">
              <a
                href={`https://instagram.com/${brand.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 rounded-[var(--radius-pill)] border border-line-invert px-4 text-[length:var(--text-small)] font-semibold text-ivory"
              >
                <InstagramIcon className="size-4.5 text-gold" />@{brand.instagram}
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 rounded-[var(--radius-pill)] border border-line-invert px-4 text-[length:var(--text-small)] font-semibold text-ivory"
              >
                <WhatsappIcon className="size-4.5 text-gold" />
                Ask a question
              </a>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
