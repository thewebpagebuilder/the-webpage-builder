import { ROLES } from "../data";
import { Icon } from "../components/Icons";
import { SectionHeading } from "../components/UI";

const SHOWCASE = [
  {
    img: "https://images.pexels.com/photos/15059760/pexels-photo-15059760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    label: "Welding & Fabrication",
  },
  {
    img: "https://images.pexels.com/photos/8539059/pexels-photo-8539059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    label: "Lab & Quality Control",
  },
  {
    img: "https://images.pexels.com/photos/31030922/pexels-photo-31030922.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    label: "Textile & Production",
  },
];

export default function RolesGrid({ showcase = true }: { showcase?: boolean }) {
  return (
    <section id="manpower" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Manpower we offer"
          title="The right people for every role"
          subtitle="We are active in offering the required manpower for your company or organisation — from frontline labour to specialised trades."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((r, i) => (
            <div
              key={r.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition hover:-translate-y-1 hover:border-brand-400/30"
              style={{ transitionDelay: `${(i % 4) * 60}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 transition group-hover:scale-110 group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white">
                <Icon.badge className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{r.desc}</p>
            </div>
          ))}
        </div>

        {showcase && (
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {SHOWCASE.map((s) => (
              <div
                key={s.label}
                className="reveal group relative h-56 overflow-hidden rounded-2xl border border-white/[0.06]"
              >
                <img
                  src={s.img}
                  alt={s.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/30 to-transparent" />
                <span className="absolute bottom-4 left-4 font-display text-base font-semibold text-white">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
