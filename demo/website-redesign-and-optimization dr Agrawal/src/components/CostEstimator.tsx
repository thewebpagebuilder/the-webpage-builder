import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, Info } from "lucide-react";

const treatments = [
  { name: "General Check-up", min: 0, max: 500 },
  { name: "Teeth Cleaning (Scaling)", min: 1500, max: 3000 },
  { name: "Root Canal (Single Tooth)", min: 3000, max: 6000 },
  { name: "Dental Implant (per tooth)", min: 15000, max: 35000 },
  { name: "Teeth Whitening", min: 5000, max: 15000 },
  { name: "Invisible Aligners (Full)", min: 80000, max: 200000 },
  { name: "Dental Veneers (per tooth)", min: 8000, max: 20000 },
  { name: "Crowns (per tooth)", min: 5000, max: 15000 },
];

export default function CostEstimator() {
  const [selected, setSelected] = useState<string>("");
  const selectedTreatment = treatments.find((t) => t.name === selected);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Cost Estimator</span>
          <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Get an Estimate for Your Treatment</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Select a treatment to see the approximate cost range.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl border border-slate-200 bg-amber-50 p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-2 text-black"><Calculator className="h-5 w-5 text-amber-600" /><span className="font-semibold">Select Treatment</span></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {treatments.map((t) => (
              <button key={t.name} onClick={() => setSelected(t.name)} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${selected === t.name ? "border-amber-500 bg-amber-100 text-amber-800" : "border-slate-200 bg-white hover:border-amber-300"}`}>
                <span className="text-sm font-medium text-black">{t.name}</span><IndianRupee className="h-4 w-4 text-amber-500" />
              </button>
            ))}
          </div>
          {selectedTreatment && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 p-6 text-white">
              <p className="text-sm opacity-90">Estimated Cost for</p>
              <p className="font-display text-xl font-bold">{selectedTreatment.name}</p>
              <div className="mt-4 flex items-baseline gap-2"><IndianRupee className="h-6 w-6" /><span className="text-3xl font-bold">{selectedTreatment.min.toLocaleString()} - {selectedTreatment.max.toLocaleString()}</span></div>
              <p className="mt-3 text-xs opacity-80">*Final cost may vary based on complexity.</p>
            </motion.div>
          )}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-amber-100 p-4"><Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><div className="text-sm text-amber-800"><p className="font-semibold">Need an exact quote?</p><p>Book a free consultation for a detailed plan.</p></div></div>
        </motion.div>
      </div>
    </section>
  );
}
