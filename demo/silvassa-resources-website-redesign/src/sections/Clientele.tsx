import { SECTORS } from "../data";

/* A continuously scrolling marquee of the industries we serve. */
export default function Clientele() {
  const items = [...SECTORS, ...SECTORS];
  return (
    <section className="border-y border-white/[0.06] bg-base-950 py-10">
      <p className="reveal mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        Trusted across industries
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {items.map((s, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-slate-300"
            >
              <span className="text-lg">{s.icon}</span>
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
