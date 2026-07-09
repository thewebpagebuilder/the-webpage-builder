import { Link } from "react-router-dom";
import { Icon } from "../components/Icons";
import { SectionHeading } from "../components/UI";

const OPENINGS = [
  {
    title: "Welders (MIG / TIG)",
    location: "Silvassa, D&NH",
    type: "Full-time",
    exp: "2+ years",
    urgent: true,
  },
  {
    title: "Industrial Electricians",
    location: "Vapi, Gujarat",
    type: "Contract",
    exp: "1+ year",
    urgent: true,
  },
  {
    title: "CNC Machine Operators",
    location: "Daman",
    type: "Full-time",
    exp: "3+ years",
    urgent: false,
  },
  {
    title: "Lab Technicians",
    location: "Silvassa, D&NH",
    type: "Full-time",
    exp: "Fresher / 1 year",
    urgent: false,
  },
  {
    title: "Helpers & General Workers",
    location: "Multiple locations",
    type: "Full-time",
    exp: "No experience",
    urgent: true,
  },
  {
    title: "Data Entry Operators",
    location: "Silvassa, D&NH",
    type: "Full-time",
    exp: "1+ year",
    urgent: false,
  },
];

export default function CurrentOpenings() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Current Openings"
            title="Active opportunities right now"
            subtitle="We update this list regularly. Walk in or call to apply — no appointment needed."
            center={false}
          />
          <Link
            to="/contact"
            className="reveal group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            See all openings <Icon.arrow className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OPENINGS.map((o, i) => (
            <div
              key={o.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition hover:-translate-y-1 hover:border-brand-400/30"
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              {o.urgent && (
                <span className="absolute right-4 top-4 rounded-full border border-rose-400/30 bg-rose-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-300">
                  Urgent
                </span>
              )}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/20" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 transition group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white">
                <Icon.badge className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{o.title}</h3>
              <div className="mt-4 space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Icon.pin className="h-3.5 w-3.5 text-brand-400" /> {o.location}
                </div>
                <div className="flex items-center gap-2">
                  <Icon.clock className="h-3.5 w-3.5 text-brand-400" /> {o.type}
                </div>
                <div className="flex items-center gap-2">
                  <Icon.badge className="h-3.5 w-3.5 text-brand-400" /> {o.exp}
                </div>
              </div>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition group-hover:text-brand-200"
              >
                Apply now <Icon.arrow className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
