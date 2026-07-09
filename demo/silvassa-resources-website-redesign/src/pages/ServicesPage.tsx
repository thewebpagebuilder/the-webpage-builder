import PageHero from "../sections/PageHero";
import SectorsGrid from "../sections/SectorsGrid";
import RolesGrid from "../sections/RolesGrid";
import WhyGrid from "../sections/WhyGrid";
import Gallery from "../sections/Gallery";
import CTABand from "../sections/CTABand";
import { SERVICES, VALUES } from "../data";
import { Icon, type IconName } from "../components/Icons";
import { SectionHeading } from "../components/UI";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="End-to-end manpower & workforce solutions"
        subtitle="From sourcing and sponsorship to payroll and compliance — we provide the best service in the industry across every kind of sector."
      />

      {/* Core services */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="Our core services"
            subtitle="A complete suite designed to take the burden of workforce management off your shoulders."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => {
              const I = Icon[s.icon as IconName];
              return (
                <div
                  key={s.title}
                  className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-8 transition hover:-translate-y-1 hover:border-brand-400/30"
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 blur-3xl transition group-hover:bg-brand-500/25" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 transition group-hover:scale-110 group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white">
                    <I className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="relative isolate overflow-hidden border-y border-white/[0.06] py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-500/[0.08] via-base-900/60 to-accent-500/[0.08]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,rgba(20,184,166,0.10),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div key={v.title} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="font-display text-3xl font-bold gradient-text">0{i + 1}</div>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RolesGrid />
      <SectorsGrid />
      <Gallery />
      <WhyGrid withProcess />
      <CTABand />
    </>
  );
}
