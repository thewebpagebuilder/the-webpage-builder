import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Is the first consultation really free?", a: "Yes, new patients can book a complimentary oral health check-up where we discuss your concerns and create a personalised treatment plan." },
  { q: "Are root canals painful at your clinic?", a: "Not at all. We use modern anesthesia and gentle techniques to ensure root canal treatment is comfortable and pain-free." },
  { q: "How long does teeth whitening take?", a: "In-office professional whitening usually takes 60–90 minutes and can brighten your smile by several shades in a single visit." },
  { q: "Do you offer invisible aligners for adults?", a: "Absolutely. We provide custom clear aligners for teens and adults using digital scans and 3D planning." },
  { q: "What safety measures do you follow?", a: "We follow strict sterilisation protocols, use disposable items wherever possible and disinfect every surface between patients." },
  { q: "Can I pay in instalments for expensive treatments?", a: "Yes, we offer flexible payment plans for implants, aligners and smile makeovers. Ask our front desk for details." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-amber-50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">FAQ</span>
          <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              <button onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between rounded-xl px-5 py-4 text-left transition hover:bg-amber-50">
                <span className="font-display font-semibold text-black">{faq.q}</span>
                {open === index ? <Minus className="h-5 w-5 text-amber-600" /> : <Plus className="h-5 w-5 text-amber-600" />}
              </button>
              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-slate-600">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
