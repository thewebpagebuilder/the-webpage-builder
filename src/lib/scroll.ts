"use client";
/**
 * Smoothly scroll to an element by ID, accounting for the fixed navbar.
 * Falls back gracefully if Lenis is available via window.
 */
export function scrollToSection(id: string, offset = 80): void {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`[scrollToSection] No element found with id="${id}"`);
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  // Use Lenis if present, otherwise native smooth scroll
  const lenis = (window as any).lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(top, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/**
 * Open the user's mail client with optional pre-filled subject/body.
 */
export function openMail(
  to: string,
  subject?: string,
  body?: string
): void {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.length ? `?${params.join("&")}` : "";
  window.location.href = `mailto:${to}${query}`;
}
