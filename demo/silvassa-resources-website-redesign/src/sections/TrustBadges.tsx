import { Icon } from "../components/Icons";
import { SectionHeading } from "../components/UI";

const BADGES = [
  { title: "EPFO Registered", sub: "Provident Fund" },
  { title: "GST Registered", sub: "Tax Compliant" },
  { title: "ESIC Compliant", sub: "Health Insurance" },
  { title: "ISO Process", sub: "Quality Focused" },
  { title: "Ministry of Labour", sub: "Recognised" },
  { title: "PF & Labour Law", sub: "Statute Compliant" },
];

export default function TrustBadges() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-base-900/80 via-white/[0.02] to-base-900/80 p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(20,184,166,0.12),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(99,102,241,0.10),transparent_50%)]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Registered & Compliant"
                title="Your safety and trust are our priority"
                subtitle="Every deployment, every payroll, every compliance — fully documented and statutory. We are registered with EPFO, GST and follow every government statute end-to-end."
                center={false}
              />
              <ul className="reveal mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "No fees charged to workers",
                  "Transparent pay slips",
                  "Background verified staff",
                  "Legal contracts for all",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                      <Icon.check className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal grid grid-cols-2 gap-3">
              {BADGES.map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-4 text-center transition hover:-translate-y-0.5 hover:border-brand-400/40"
                >
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/20">
                    <Icon.shield className="h-4 w-4" />
                  </div>
                  <div className="mt-2 font-display text-sm font-semibold text-white">{b.title}</div>
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">{b.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
