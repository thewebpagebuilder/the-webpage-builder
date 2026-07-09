import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Phone, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero";
import CTABanner from "../../components/CTABanner";

const steps = [
  { title: "Diagnosis", desc: "Digital X-rays and examination to confirm infection and plan treatment." },
  { title: "Anesthesia", desc: "Local anesthesia ensures you're completely comfortable — you won't feel a thing." },
  { title: "Access Opening", desc: "A small opening is made in the tooth to reach the infected pulp." },
  { title: "Cleaning & Shaping", desc: "The infected pulp is removed, and the canal is cleaned and shaped." },
  { title: "Filling", desc: "The canal is filled with a biocompatible material called gutta-percha." },
  { title: "Restoration", desc: "A crown is placed to protect and restore the tooth's function." },
];

const myths = [
  { myth: "Root canals are painful", truth: "Modern techniques and anesthesia make the procedure virtually painless. Most patients feel relief after the procedure." },
  { myth: "It's better to extract the tooth", truth: "Saving your natural tooth is always preferable. Root canals have a high success rate and preserve your natural bite." },
  { myth: "Root canals cause illness", truth: "This outdated myth has been debunked by modern research. Root canals are safe and effective." },
  { myth: "The procedure takes multiple visits", truth: "Most root canals are completed in a single visit of 60-90 minutes." },
];

export default function RootCanalGuide() {
  return (
    <>
      <PageHero 
        eyebrow="Resource Guide" 
        title="Root Canal Treatment Explained" 
        subtitle="Debunking myths and explaining the modern, painless root canal procedure."
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "Root Canal Guide" }]}
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
            <h2 className="font-display text-3xl font-bold text-black">What is a Root Canal?</h2>
            <p className="text-black/75">
              A root canal is a dental procedure used to treat infection at the center of a tooth (the root canal system). It's needed when the blood or nerve supply of the tooth (the pulp) is damaged by decay, injury, or infection.
            </p>
            <p className="text-black/75">
              At Dr. Agrawal's, we use modern microscopic techniques and rotary instruments to ensure precise, comfortable, and efficient treatment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-display text-3xl font-bold text-black">The Procedure: Step by Step</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-amber-200 bg-amber-50 p-5"
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 font-bold text-sm text-black">
                  {index + 1}
                </div>
                <h3 className="mb-1 font-display font-bold text-black">{step.title}</h3>
                <p className="text-sm text-black/70">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-black">Myths vs. Reality</h2>
          <div className="space-y-4">
            {myths.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">MYTH</span>
                  <span className="font-medium text-black">{item.myth}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">TRUTH</span>
                  <p className="text-black/70">{item.truth}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-black">Signs You May Need a Root Canal</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Severe toothache when chewing", "Prolonged sensitivity to hot/cold", "Darkening of the tooth", "Swollen, tender gums near the tooth", "Persistent pimple on the gums", "Deep decay or large filling"].map((sign, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-amber-50 p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-600" />
                <span className="text-black/75">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 to-yellow-100 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold text-black">Concerned About a Tooth?</h2>
          <p className="mb-8 text-black/70">Don't wait — early treatment prevents complications. Book your consultation today.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:bg-amber-600">
              <Calendar className="h-5 w-5" /> Book Consultation
            </Link>
            <a href="tel:+917498444051" className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-white px-6 py-3 font-semibold text-black transition hover:bg-amber-50">
              <Phone className="h-5 w-5" /> Call Now
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
