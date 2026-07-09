import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const insurers = ["Bajaj Allianz", "HDFC Ergo", "ICICI Lombard", "Star Health", "Care Health", "Niva Bupa"];

export default function InsurancePartners() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Insurance Accepted</span>
          <h2 className="font-display text-2xl font-bold text-black sm:text-3xl">We Work With Major Insurance Providers</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Cashless treatments available. Our team will help you with all paperwork and claims.</p>
        </motion.div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {insurers.map((insurer, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-amber-50 px-4 py-6 transition hover:border-amber-300 hover:bg-amber-100">
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-black">{insurer}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center"><p className="text-sm text-slate-500">Don't see your provider? <a href="#/contact" className="font-medium text-amber-600 hover:underline">Contact us</a> — we may still be able to help.</p></div>
      </div>
    </section>
  );
}
