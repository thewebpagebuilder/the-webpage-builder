import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

export default function PageHero({ eyebrow, title, subtitle, crumbs = [] }: { eyebrow?: string; title: string; subtitle?: string; crumbs?: Crumb[] }) {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-50 to-yellow-100" />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          {eyebrow && <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">{eyebrow}</span>}
          <h1 className="font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-black/70">{subtitle}</p>}
          <nav className="mt-6 flex items-center gap-2 text-sm text-black/60">
            <Link to="/" className="hover:text-amber-600">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                {c.to ? <Link to={c.to} className="hover:text-amber-600">{c.label}</Link> : <span className="text-amber-700">{c.label}</span>}
              </span>
            ))}
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
