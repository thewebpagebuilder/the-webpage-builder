import { useEffect } from "react";

/**
 * Adds the `is-visible` class to every `.reveal` element when it scrolls
 * into view. Re-scans whenever `dep` changes (e.g. on route change).
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    // Allow the new route's DOM to paint first.
    const id = window.setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));

      if (!("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );

      els.forEach((el) => observer.observe(el));
    }, 60);

    return () => window.clearTimeout(id);
  }, [dep]);
}
