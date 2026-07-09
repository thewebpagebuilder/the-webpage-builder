import { PROCESS, WHY } from "../data";
import { Icon, type IconName } from "../components/Icons";
import { SectionHeading } from "../components/UI";

export default function WhyGrid({ withProcess = true }: { withProcess?: boolean }) {
  return (
    <section id="why" className="relative border-y border-white/[0.06] bg-base-900/50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why choose us"
          title="More than a supplier — your manpower partner"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => {
            const I = Icon[w.icon as IconName];
            return (
              <div
                key={w.title}
                className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-7 transition hover:-translate-y-1 hover:border-brand-400/30"
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/25" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30 transition group-hover:scale-110">
                  <I className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.desc}</p>
              </div>
            );
          })}
        </div>

        {withProcess && (
          <div className="mt-24">
            <h3 className="reveal text-center font-display text-2xl font-bold text-white sm:text-3xl">
              How we work
            </h3>
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {PROCESS.map((p, i) => (
                <div key={p.step} className="reveal relative" style={{ transitionDelay: `${i * 90}ms` }}>
                  {i < PROCESS.length - 1 && (
                    <span className="absolute left-12 top-6 hidden h-px w-full bg-gradient-to-r from-brand-400/40 to-transparent md:block" />
                  )}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-400/30 bg-base-950 font-display text-lg font-bold text-brand-300">
                    {p.step}
                  </div>
                  <h4 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
