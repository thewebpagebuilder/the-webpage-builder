import PageHero from "../sections/PageHero";
import CTABand from "../sections/CTABand";
import { MISSION_PILLARS } from "../data";
import { Icon, type IconName } from "../components/Icons";
import { SectionHeading } from "../components/UI";

export default function MissionVision() {
  return (
    <>
      <PageHero
        eyebrow="Mission & Vision"
        title="Our purpose, our promise"
        subtitle="We work with our clients not as recruitment contractors, but as HR partners — seeking their success by recruiting the right candidate."
      />

      {/* Mission objective */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Our Mission" title="We work together as a team" center={false} />
              <p className="reveal mt-5 leading-relaxed text-slate-300">
                We focus on our basic objective — being{" "}
                <span className="font-semibold text-brand-300">"On to Workers"</span> and{" "}
                <span className="font-semibold text-brand-300">"For The Company"</span>.
                We collaborate with a perfect recruitment plan and workforce
                solution that grows with you.
              </p>
              <p className="reveal mt-4 leading-relaxed text-slate-300">
                We work with our clients not as recruitment contractors, but as
                HR partners — with the motive of seeking their success by
                recruiting the right candidate. We change the world of work.
              </p>
            </div>
            <div className="reveal grid gap-4">
              {[
                ["On to Workers", "Empowering people with the right opportunities."],
                ["For The Company", "Fulfilling every client's exact manpower needs."],
              ].map(([t, d]) => (
                <div key={t} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition hover:border-brand-400/30">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/25" />
                  <div className="relative flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                      <Icon.target className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">{t}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The 3 E's */}
      <section className="border-y border-white/[0.06] bg-base-900/50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="How we deliver"
            title="Engage · Endeavour · Empower"
            subtitle="Three principles that guide every placement we make."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {MISSION_PILLARS.map((p, i) => {
              const I = Icon[p.icon as IconName];
              return (
                <div
                  key={p.e}
                  className="reveal group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-8 transition hover:-translate-y-1 hover:border-brand-400/30"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <span className="absolute -right-4 -top-6 font-display text-8xl font-bold text-white/[0.04]">
                    {i + 1}
                  </span>
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/10 blur-3xl transition group-hover:bg-brand-500/25" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-accent-500 text-white shadow-xl shadow-brand-500/30 transition group-hover:scale-110">
                    <I className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold gradient-text">{p.e}</h3>
                  <h4 className="mt-1 font-display text-base font-semibold text-white">{p.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision / Make in India */}
      <section className="relative isolate overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 -z-10">
          <img src="/images/vision.jpg" alt="" className="h-full w-full object-cover opacity-30" loading="lazy" />
          <div className="absolute inset-0 bg-base-950/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/70 to-base-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(99,102,241,0.12),transparent_50%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <SectionHeading eyebrow="Our Vision" title="Building India's manufacturing future" center={false} />
            <p className="reveal mt-5 text-lg leading-relaxed text-slate-200">
              We want to become a leading company with one goal — to provide more
              work opportunities for more people across industrial and service
              sectors. We are 100% compliance-oriented in all HR & Payroll Solutions.
            </p>
            <p className="reveal mt-4 leading-relaxed text-slate-300">
              With the Government's strong emphasis on <span className="font-semibold text-brand-300">"Make in India"</span>,
              our country can become the manufacturing hub of Asia by 2047. As
              Indian manufacturing emerges as a high-growth sector targeting global
              competitors, this creates strong domestic and global demand — at low
              manufacturing costs and with world-class technical inputs.
            </p>
            <p className="reveal mt-4 leading-relaxed text-slate-300">
              This phase of tremendous growth is accompanied by investment in
              product enhancement, quality design, R&D and the best manpower. With
              that same motto, we provide the best expertise to every industrial
              sector — enriching society and growing our economy.
            </p>

            <div className="reveal mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["100%", "Compliance oriented"],
                ["2047", "Asia's manufacturing hub goal"],
                ["Make in India", "Aligned with national vision"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-brand-500/[0.08] to-accent-500/[0.08] p-5 backdrop-blur">
                  <div className="font-display text-2xl font-bold text-brand-300">{v}</div>
                  <div className="mt-1 text-sm text-slate-300">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
