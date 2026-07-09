import { Link } from "react-router-dom";
import { Icon } from "../components/Icons";
import { SectionHeading } from "../components/UI";

const BENEFITS = [
  {
    title: "Salary on Time",
    desc: "Every month, without fail. Transparent pay slips with no hidden deductions.",
    icon: "wallet",
  },
  {
    title: "PF & ESIC Coverage",
    desc: "Provident Fund, ESIC and insurance — you're protected for life and health.",
    icon: "shield",
  },
  {
    title: "No Charges to Workers",
    desc: "We never charge workers any fees. Our clients pay us — your earnings stay yours.",
    icon: "badge",
  },
  {
    title: "Skill Development",
    desc: "Free training and upskilling opportunities to grow from helper to specialist.",
    icon: "bolt",
  },
  {
    title: "Safe Work Environment",
    desc: "We partner only with companies that maintain strict safety and compliance standards.",
    icon: "check",
  },
  {
    title: "Job Security",
    desc: "Long-term placements with stable companies — many of our workers have been with us for years.",
    icon: "users",
  },
];

const STEPS = [
  { step: "01", title: "Visit or Call", desc: "Walk into our Silvassa office or call 0260-2633385 to express interest." },
  { step: "02", title: "Skill Assessment", desc: "We assess your trade, experience and preferred role — honest and fair." },
  { step: "03", title: "Documentation", desc: "Submit Aadhaar, PAN, bank details — we handle all statutory registrations." },
  { step: "04", title: "Get Deployed", desc: "Matched to a suitable company near your preferred location. Start earning." },
];

export default function ForApplicants() {
  return (
    <section className="relative border-y border-white/[0.06] bg-base-900/50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="For Applicants"
          title="A career, not just a job"
          subtitle="Joining Silvassa Resources means joining a family that pays on time, protects your future and invests in your skills."
        />

        {/* Benefits grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => {
            const I = Icon[b.icon as keyof typeof Icon];
            return (
              <div
                key={b.title}
                className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-7 transition hover:-translate-y-1 hover:border-brand-400/30"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/25" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 transition group-hover:scale-110 group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white">
                  <I className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.desc}</p>
              </div>
            );
          })}
        </div>

        {/* How to apply */}
        <div className="mt-20">
          <h3 className="reveal text-center font-display text-2xl font-bold text-white sm:text-3xl">
            How to apply — 4 simple steps
          </h3>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.step} className="reveal relative" style={{ transitionDelay: `${i * 90}ms` }}>
                {i < STEPS.length - 1 && (
                  <span className="absolute left-12 top-6 hidden h-px w-full bg-gradient-to-r from-brand-400/40 to-transparent md:block" />
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-400/30 bg-base-950 font-display text-lg font-bold text-brand-300">
                  {s.step}
                </div>
                <h4 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal mt-14 overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-brand-500/10 via-base-900/60 to-accent-500/10 p-8 text-center sm:p-12">
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Ready to start your <span className="gradient-text">career?</span>
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Walk in to our office with your documents — no appointment needed.
            Or call us directly to learn about current openings.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-500/30 transition hover:shadow-brand-500/50 hover:brightness-110"
            >
              Contact Us
            </Link>
            <a
              href="tel:+912602633385"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              <Icon.phone className="h-4 w-4" /> 0260 - 2633385
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
