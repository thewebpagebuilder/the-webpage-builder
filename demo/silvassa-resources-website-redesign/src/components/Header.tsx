import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { COMPANY } from "../data";
import { Icon } from "./Icons";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Mission & Vision", to: "/mission-vision" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.06] bg-base-950/80 py-3 backdrop-blur-2xl" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-accent-500 font-display text-lg font-bold text-white shadow-lg shadow-brand-500/30 transition group-hover:shadow-brand-500/50">
            S
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold tracking-tight text-white">
              Silvassa Resources
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-brand-400/90">
              Manpower Solutions
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition hover:text-white ${
                  isActive ? "text-white" : "text-slate-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400 to-accent-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:shadow-brand-500/40 hover:brightness-110"
          >
            <Icon.phone className="h-4 w-4" />
            {COMPANY.phone}
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white lg:hidden"
        >
          {open ? <Icon.close className="h-6 w-6" /> : <Icon.menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-base-950/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-white/5 hover:text-white ${
                  isActive ? "bg-white/5 text-brand-400" : "text-slate-200"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white"
          >
            <Icon.phone className="h-4 w-4" /> {COMPANY.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
