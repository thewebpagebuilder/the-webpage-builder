import { SECTORS } from "../data";
import { SectionHeading } from "../components/UI";

export default function SectorsGrid() {
  return (
    <section id="sectors" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Sectors we serve"
          title="Manpower for every industry"
          subtitle="We provide skilled and reliable manpower across a wide spectrum of industries — and many more beyond this list."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SECTORS.map((s, i) => (
            <div
              key={s.name}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-400/30 hover:from-brand-500/[0.06]"
              style={{ transitionDelay: `${(i % 4) * 60}ms` }}
            >
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/25" />
              <div className="text-3xl transition duration-300 group-hover:scale-110">{s.icon}</div>
              <h3 className="mt-4 font-display text-base font-semibold text-white">{s.name}</h3>
            </div>
          ))}
          <div className="reveal grid place-items-center rounded-2xl border border-dashed border-brand-400/25 bg-brand-500/[0.04] p-6 text-center">
            <span className="font-display text-base font-semibold text-brand-300">+ Many more…</span>
          </div>
        </div>
      </div>
    </section>
  );
}
