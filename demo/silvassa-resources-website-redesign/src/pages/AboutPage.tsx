import PageHero from "../sections/PageHero";
import StatsBand from "../sections/StatsBand";
import CTABand from "../sections/CTABand";
import Gallery from "../sections/Gallery";
import { COMPANY, REGISTRATIONS, SISTER_CONCERNS, TEAM } from "../data";
import { Icon } from "../components/Icons";
import { SectionHeading } from "../components/UI";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A legacy of building India's industrial workforce"
        subtitle="Part of the Dixit Group of Companies — a renowned organisation rendering highly customized manpower services to every kind of industry."
      />

      {/* Who we are */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="reveal relative">
              <div className="overflow-hidden rounded-3xl border border-white/[0.06]">
                <img
                  src="https://images.pexels.com/photos/29224625/pexels-photo-29224625.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Skilled welder at work"
                  className="h-[440px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -left-4 -top-4 -z-10 h-28 w-28 animate-floaty rounded-2xl border border-brand-400/20 bg-gradient-to-br from-brand-500/10 to-accent-500/10" />
            </div>
            <div>
              <SectionHeading eyebrow="Who we are" title="Three decades of trust" center={false} />
              <p className="reveal mt-5 leading-relaxed text-slate-300">
                The company began its journey in {COMPANY.founded} — a legacy of more
                than three decades. {COMPANY.full} was formally incorporated in {COMPANY.incorporated},
                started by three visionary men with a common aim: to make everyone
                aware of suitable jobs for needy people, while fulfilling the
                requirements of client companies.
              </p>
              <p className="reveal mt-4 leading-relaxed text-slate-300">
                We are registered with the EPFO and under the Service Tax Act and
                GST. By following every government statute, Silvassa Resources has
                emerged as a renowned organisation rendering highly customized
                services to all kinds of industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registrations / compliance */}
      <section className="border-y border-white/[0.06] bg-base-900/50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Compliance first"
            title="Fully registered & statute-compliant"
            subtitle="We follow all government regulations end-to-end, so you never have to worry about compliance."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REGISTRATIONS.map((r, i) => (
              <div
                key={r.label}
                className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-7 transition hover:-translate-y-1 hover:border-brand-400/30"
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/25" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30 transition group-hover:scale-110">
                  <Icon.shield className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-white">{r.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      {/* Group of companies */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Dixit Group of Companies"
            title="One management, multiple strengths"
            subtitle="Beyond Silvassa Resources, we operate two sister concerns under the same flagship and management."
          />
          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {SISTER_CONCERNS.map((c) => (
              <div
                key={c.name}
                className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-8 text-center transition hover:-translate-y-1 hover:border-brand-400/30"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/25" />
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30 transition group-hover:scale-110">
                  <Icon.badge className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{c.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-t border-white/[0.06] bg-base-900/50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="Our company heads & team leads"
            subtitle="Meet the directors steering Silvassa Resources and the Dixit Group of Companies."
          />
          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="reveal group flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition hover:border-brand-400/30"
              >
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-accent-500 font-display text-2xl font-bold text-white shadow-lg shadow-brand-500/30">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{m.name}</h3>
                  <p className="text-sm font-medium text-brand-300">{m.role}</p>
                  <p className="mt-1 text-xs text-slate-400">Dixit Group of Companies</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team photo */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Our People"
                title="Behind every deployment is a team that cares"
                center={false}
              />
              <p className="reveal mt-5 leading-relaxed text-slate-300">
                From recruiters who know every trade to compliance officers who
                ensure every worker is protected — our in-house team is as
                dedicated as the workforce we deploy.
              </p>
              <p className="reveal mt-4 leading-relaxed text-slate-300">
                We don't just match resumes to job descriptions. We build
                careers and partnerships that last.
              </p>
              <div className="reveal mt-7 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-6">
                {[
                  ["25+", "Team members"],
                  ["14+", "Industry experts"],
                  ["100%", "In-house payroll"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="font-display text-2xl font-bold text-brand-300">{v}</div>
                    <div className="mt-1 text-xs text-slate-400">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal overflow-hidden rounded-3xl border border-white/[0.06]">
              <img
                src="/images/team.jpg"
                alt="Silvassa Resources team"
                className="h-[440px] w-full object-cover transition duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Gallery />

      <CTABand />
    </>
  );
}
