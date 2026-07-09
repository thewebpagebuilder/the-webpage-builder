import { motion } from "framer-motion";
import { Search, ClipboardList, Activity, Smile } from "lucide-react";
import PageHero from "../components/PageHero";
import Services from "../components/Services";
import CostEstimator from "../components/CostEstimator";
import ToothDiagram from "../components/ToothDiagram";
import FAQ from "../components/FAQ";
import CTABanner from "../components/CTABanner";

const steps = [
  { icon: Search, title: "Consultation & Diagnosis", desc: "A thorough check-up with digital X-rays and intra-oral scans." },
  { icon: ClipboardList, title: "Personalised Plan", desc: "We explain every option with transparent pricing." },
  { icon: Activity, title: "Painless Treatment", desc: "Treatment carried out gently using modern, sterilised equipment." },
  { icon: Smile, title: "Aftercare & Follow-up", desc: "We stay in touch with reminders and check-ups." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our Services" title="Complete Dental Care Under One Roof" subtitle="From routine cleanings to full smile makeovers." crumbs={[{ label: "Services" }]} />
      <Services />
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">How It Works</span>
            <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Your Smile Journey in 4 Steps</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative rounded-2xl border border-slate-100 bg-amber-50 p-6">
                <span className="absolute right-5 top-5 font-display text-4xl font-extrabold text-amber-200">{index + 1}</span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-md"><step.icon className="h-6 w-6" /></div>
                <h3 className="mb-2 font-display text-lg font-bold text-black">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <h2 className="font-display text-2xl font-bold text-black sm:text-3xl">Honest Pricing, No Surprises</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">Every treatment begins with a clear, written cost estimate. We offer flexible payment plans for implants, aligners and smile makeovers.</p>
          </div>
        </div>
      </section>
      <CostEstimator />
      <ToothDiagram />
      <FAQ />
      <CTABanner />
    </>
  );
}
