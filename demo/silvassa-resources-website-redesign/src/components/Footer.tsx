import { Link } from "react-router-dom";
import { COMPANY } from "../data";
import { Icon } from "./Icons";

const SOCIALS = ["Facebook", "Twitter", "LinkedIn", "Instagram"];

const NAV: [string, string][] = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Mission & Vision", "/mission-vision"],
  ["Services", "/services"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-base-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-accent-500 font-display text-lg font-bold text-white shadow-lg shadow-brand-500/30">
                S
              </span>
              <span className="font-display text-lg font-bold text-white">
                Silvassa Resources Pvt. Ltd.
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
              Part of the {COMPANY.group} — a three-decade legacy of supplying
              sponsored, compliant industrial manpower across India. We change the
              world of work, one skilled worker at a time.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="group grid h-10 w-10 place-items-center rounded-full border border-white/10 text-xs font-semibold text-slate-300 transition hover:border-brand-400/50 hover:bg-gradient-to-br hover:from-brand-500/20 hover:to-accent-500/20 hover:text-white"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {NAV.map(([l, h]) => (
                <li key={h}>
                  <Link to={h} className="transition hover:text-brand-400">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
              Reach Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex gap-2">
                <Icon.phone className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-brand-400">{COMPANY.phone}</a>
              </li>
              <li className="flex gap-2">
                <Icon.mail className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-brand-400">{COMPANY.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-7 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.full}. All rights reserved.</p>
          <p>Leading Industrial Manpower Supplier · Silvassa, D & NH</p>
        </div>
      </div>
    </footer>
  );
}
