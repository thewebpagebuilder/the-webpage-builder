import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";

/* Top scroll-progress bar */
export function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setW(Math.min(scrolled * 100, 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        className="h-full bg-gradient-to-r from-brand-400 via-brand-500 to-accent-500 transition-[width] duration-150"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

/* Back-to-top floating button */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-xl shadow-brand-500/40 transition-all duration-300 hover:shadow-brand-500/60 hover:brightness-110 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Icon.up className="h-5 w-5" />
    </button>
  );
}

/* Section eyebrow + heading */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <span className="reveal inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-500/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
        <Icon.spark className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="reveal mt-4 font-display text-3xl font-bold sm:text-4xl text-balance text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="reveal mt-4 text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* Animated count-up number */
export function Counter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const dur = 1800;
            const tick = (now: number) => {
              const p = Math.min((now - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.floor(eased * value).toLocaleString();
              if (p < 1) requestAnimationFrame(tick);
              else el.textContent = value.toLocaleString();
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
