"use client";

import { useEffect, useState } from "react";

/* Whether the mobile sticky enrol bar is showing: once the hero has scrolled
 * away, and until the pricing section arrives so it never covers the real
 * buttons. Shared so the header can step its own CTA aside at the same moment
 * — a phone should never show two "Enroll" buttons in its chrome at once. */
export function useStickyCtaVisible() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pricingEl = document.getElementById("pricing");
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atPricing = pricingEl
        ? pricingEl.getBoundingClientRect().top < window.innerHeight
        : false;
      setShow(pastHero && !atPricing);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return show;
}
