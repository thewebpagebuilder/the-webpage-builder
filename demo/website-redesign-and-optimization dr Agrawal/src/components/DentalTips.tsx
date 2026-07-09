import { motion } from "framer-motion";
import { ChevronRight, Activity, Sparkles, Shield } from "lucide-react";

const tips = [
  { icon: Activity, title: "Brush Twice Daily", desc: "Use a soft-bristled brush and fluoride toothpaste. Replace your brush every 3 months.", color: "from-amber-500 to-yellow-500" },
  { icon: Sparkles, title: "Floss Every Day", desc: "Remove food particles and plaque between teeth where brushing can't reach.", color: "from-yellow-400 to-amber-500" },
  { icon: Shield, title: "Regular Check-ups", desc: "Visit us every 6 months for preventive care and early detection of issues.", color: "from-amber-600 to-yellow-500" },
];

export default function DentalTips() {
  return (
    <section className="bg-amber-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Dental Care Tips</span>
          <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Keep Your Smile Healthy</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Simple daily habits can prevent major dental problems. Follow these expert tips.</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {tips.map((tip, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${tip.color} text-white shadow-lg transition group-hover:scale-110`}><tip.icon className="h-7 w-7" /></div>
              <h3 className="mb-2 font-display text-lg font-bold text-black">{tip.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition hover:text-amber-700">Get personalised care advice <ChevronRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}
