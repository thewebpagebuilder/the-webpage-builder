import { Link } from "react-router-dom";
import { COMPANY } from "../data";
import { Icon } from "../components/Icons";

export default function CTABand() {
  return (
    <section className="relative isolate overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <img src="/images/cta.jpg" alt="" className="h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-base-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-950 via-base-950/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(20,184,166,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(99,102,241,0.12),transparent_45%)]" />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl text-balance">
            Ready to scale your <span className="gradient-text">workforce?</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Let Silvassa Resources handle your manpower, payroll and compliance —
            so your business never slows down.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-500/30 transition hover:shadow-brand-500/50 hover:brightness-110"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition group-hover:translate-x-full" />
              Request Manpower
              <Icon.arrow className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              <Icon.phone className="h-4 w-4" /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
