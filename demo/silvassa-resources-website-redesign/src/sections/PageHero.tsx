import { Link } from "react-router-dom";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        {image ? (
          <>
            <img src={image} alt="" className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-base-950/85" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-base-900 via-base-950 to-base-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-transparent to-base-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(99,102,241,0.10),transparent_50%)]" />
      </div>
      <div className="pointer-events-none absolute -left-20 top-10 -z-10 h-72 w-72 animate-floaty rounded-full bg-brand-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <nav className="reveal mb-5 flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link to="/" className="transition hover:text-brand-400">Home</Link>
          <span>/</span>
          <span className="text-brand-400">{eyebrow}</span>
        </nav>
        <h1 className="reveal max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
