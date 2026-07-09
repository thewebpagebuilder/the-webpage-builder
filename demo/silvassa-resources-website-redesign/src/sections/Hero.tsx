import { Link } from "react-router-dom";
import { COMPANY } from "../data";
import { Icon } from "../components/Icons";
import { Counter } from "../components/UI";

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero.jpg"
          alt="Industrial workforce on a modern factory floor"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-base-950 via-base-950/95 to-base-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-transparent to-base-950/70" />
        {/* Mesh-gradient highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(20,184,166,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(99,102,241,0.15),transparent_45%)]" />
      </div>

      {/* Floating orbs */}
      <div className="pointer-events-none absolute -right-32 top-24 -z-10 h-96 w-96 animate-floaty rounded-full bg-brand-500/15 blur-3xl" />
      <div className="pointer-events-none absolute left-10 bottom-10 -z-10 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-32 pb-20 sm:px-8">
        <div className="max-w-3xl">
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
            {COMPANY.group} · Trusted since {COMPANY.founded}
          </span>

          <h1 className="reveal mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl text-balance">
            Powering Industries with{" "}
            <span className="gradient-text">Skilled Manpower</span>
          </h1>

          <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            From welders and fitters to electricians and technicians — we supply
            trade-tested industrial workforce under full sponsorship, so you can
            focus on production while we handle compliance, payroll & people.
          </p>

          <div className="reveal mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-500/30 transition hover:shadow-brand-500/50 hover:brightness-110"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition group-hover:translate-x-full" />
              Request Manpower
              <Icon.arrow className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              Explore Services
            </Link>
          </div>

          {/* Inline mini-stats */}
          <div className="reveal mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
            {[
              { v: 30, s: "+", l: "Years" },
              { v: 5000, s: "+", l: "Paid / month" },
              { v: 250, s: "+", l: "Companies" },
            ].map((m) => (
              <div key={m.l}>
                <Counter value={m.v} suffix={m.s} className="font-display text-2xl font-bold text-white sm:text-3xl" />
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-brand-400" />
        </div>
      </div>
    </section>
  );
}
