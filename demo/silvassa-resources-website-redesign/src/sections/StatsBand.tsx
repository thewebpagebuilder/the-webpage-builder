import { STATS } from "../data";
import { Counter } from "../components/UI";

export default function StatsBand() {
  return (
    <section className="relative border-y border-white/[0.06] bg-base-900/50 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 text-center transition hover:border-brand-400/30"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/20" />
            <Counter
              value={s.value}
              suffix={s.suffix}
              className="font-display text-3xl font-bold gradient-text sm:text-4xl"
            />
            <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
