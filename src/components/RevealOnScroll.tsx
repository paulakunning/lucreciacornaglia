"use client";

import { useEffect } from "react";

const STAGGER_MS = 80;

/**
 * Fades `[data-reveal]` blocks in as they scroll into view, once (styles in globals.css).
 * Only blocks still below the fold get hidden, so if this never runs nothing stays invisible.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Blocks that enter together, like a row of cards, appear one after another.
        let delay = 0;
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting || !(target instanceof HTMLElement)) continue;
          target.style.setProperty("--reveal-delay", `${delay}ms`);
          target.dataset.reveal = "shown";
          observer.unobserve(target);
          delay += STAGGER_MS;
        }
      },
      { threshold: 0.1 },
    );
    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.dataset.reveal = "hidden";
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
