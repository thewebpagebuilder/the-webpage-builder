import { Icon } from "../components/Icons";

const TESTIMONIALS = [
  {
    quote:
      "Silvassa Resources has been our trusted manpower partner for over 8 years. Their skilled welders and technicians are always deployment-ready and fully compliant.",
    name: "Rajesh Kumar",
    role: "HR Manager",
    company: "Leading Pharmaceutical Company",
    type: "client",
  },
  {
    quote:
      "I joined as a helper 5 years ago. Today I'm a skilled fitter with PF, ESIC, and regular salary. They truly care about workers' growth.",
    name: "Suresh Patel",
    role: "Skilled Fitter",
    company: "Engineering Sector",
    type: "worker",
  },
  {
    quote:
      "Their rapid deployment capability saved our production timelines multiple times. Professional, compliant, and reliable — exactly what we needed.",
    name: "Priya Sharma",
    role: "Operations Head",
    company: "Textile Manufacturing",
    type: "client",
  },
  {
    quote:
      "Best part? Salary on time, every month. No hidden deductions. They explain everything clearly and treat us with respect.",
    name: "Anil Kumar",
    role: "Electrician",
    company: "Chemical Industry",
    type: "worker",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-500/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            <Icon.spark className="h-3.5 w-3.5" />
            Trusted voices
          </span>
          <h2 className="reveal mt-4 font-display text-3xl font-bold text-white sm:text-4xl text-balance">
            What clients & workers say
          </h2>
          <p className="reveal mt-4 text-slate-400">
            Real stories from companies we serve and workers we support.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-8 transition hover:-translate-y-1 hover:border-brand-400/30"
              style={{ transitionDelay: `${(i % 2) * 80}ms` }}
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/10 blur-3xl transition group-hover:bg-brand-500/20" />
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                <span className={`h-2 w-2 rounded-full ${t.type === "client" ? "bg-accent-400" : "bg-brand-400"}`} />
                <span className={t.type === "client" ? "text-accent-400" : "text-brand-300"}>
                  {t.type === "client" ? "Client" : "Worker"}
                </span>
              </div>
              <Icon.quote className="mt-4 h-8 w-8 text-brand-400/30" />
              <p className="mt-3 leading-relaxed text-slate-200">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-accent-500 font-display text-base font-bold text-white shadow-lg shadow-brand-500/30">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                  <div className="text-xs text-brand-400">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
