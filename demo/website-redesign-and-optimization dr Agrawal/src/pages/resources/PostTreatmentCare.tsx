import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Phone, CheckCircle2, AlertTriangle, Utensils, Pill, Sparkles } from "lucide-react";
import PageHero from "../../components/PageHero";
import CTABanner from "../../components/CTABanner";

const generalTips = [
  { icon: Sparkles, title: "Manage Swelling", desc: "Apply ice pack for 15-20 minutes if there's swelling after extraction or surgery." },
  { icon: Utensils, title: "Eat Soft Foods", desc: "Stick to soft, lukewarm foods for 24-48 hours after most procedures." },
  { icon: Pill, title: "Take Medications", desc: "Complete your prescribed antibiotic course. Take painkillers as directed." },
  { icon: Sparkles, title: "Keep It Clean", desc: "Gentle rinsing with warm salt water after 24 hours. Avoid vigorous rinsing." },
];

const procedureCare = [
  {
    title: "After Root Canal",
    tips: ["Avoid chewing on the treated tooth until the final restoration", "Mild sensitivity is normal for a few days", "Contact us if pain persists beyond 3 days"],
  },
  {
    title: "After Extraction",
    tips: ["Bite on gauze for 30-45 minutes", "No spitting, rinsing, or using a straw for 24 hours", "Avoid smoking for at least 48 hours"],
  },
  {
    title: "After Implant Surgery",
    tips: ["Rest and avoid strenuous activity for 48 hours", "Apply ice to reduce swelling", "Soft diet for 1-2 weeks", "Keep the area clean with gentle rinsing"],
  },
  {
    title: "After Whitening",
    tips: ["Avoid colored foods/drinks for 48 hours", "Use sensitivity toothpaste if needed", "Avoid very hot or cold items temporarily"],
  },
];

const warningSigns = [
  "Excessive bleeding that won't stop",
  "Severe pain not helped by medication",
  "Fever above 100.4°F (38°C)",
  "Pus or foul taste in mouth",
  "Difficulty breathing or swallowing",
];

export default function PostTreatmentCare() {
  return (
    <>
      <PageHero 
        eyebrow="Resource Guide" 
        title="Post-Treatment Care Instructions" 
        subtitle="Downloadable PDF with care guidelines for various dental procedures."
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "Post-Treatment Care" }]}
      />
      
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700">
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="prose prose-lg max-w-none">
            <h2 className="font-display text-3xl font-bold text-black">General Care Guidelines</h2>
            <p className="text-black/75">
              Proper aftercare ensures faster healing and the best results from your dental treatment. Follow these guidelines and don't hesitate to call us if you have concerns.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-display text-3xl font-bold text-black">Essential Tips</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {generalTips.map((tip, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5"
              >
                <tip.icon className="h-6 w-6 shrink-0 text-amber-600" />
                <div>
                  <h3 className="font-semibold text-black">{tip.title}</h3>
                  <p className="text-sm text-black/70">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-display text-3xl font-bold text-black">Procedure-Specific Care</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {procedureCare.map((procedure, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <h3 className="mb-4 font-display text-lg font-bold text-black">{procedure.title}</h3>
                <ul className="space-y-2">
                  {procedure.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-black/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="mb-4 flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="font-display text-xl font-bold">When to Call Us Immediately</h3>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {warningSigns.map((sign, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-red-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  {sign}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium text-red-700">
              Emergency? Call us immediately: <a href="tel:+917498444051" className="underline">+91 74984 44051</a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 to-yellow-100 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold text-black">Questions About Your Recovery?</h2>
          <p className="mb-8 text-black/70">Our team is here to help. Reach out anytime.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:bg-amber-600">
              <Calendar className="h-5 w-5" /> Book Follow-up
            </Link>
            <a href="tel:+917498444051" className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-white px-6 py-3 font-semibold text-black transition hover:bg-amber-50">
              <Phone className="h-5 w-5" /> Call Us
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
