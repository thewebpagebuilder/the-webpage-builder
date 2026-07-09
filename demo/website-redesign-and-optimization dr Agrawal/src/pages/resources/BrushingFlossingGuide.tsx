import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Phone, CheckCircle2, Droplets, Clock, Sun, Sparkles } from "lucide-react";
import PageHero from "../../components/PageHero";
import CTABanner from "../../components/CTABanner";

const brushingSteps = [
  "Use a soft-bristled toothbrush and fluoride toothpaste.",
  "Hold the brush at a 45° angle to your gums.",
  "Use gentle, circular motions — don't scrub hard.",
  "Brush all surfaces: outer, inner, and chewing surfaces.",
  "Brush your tongue to remove bacteria and freshen breath.",
  "Brush for 2 minutes, twice daily — morning and night.",
];

const flossingSteps = [
  "Use about 18 inches of floss, winding most around middle fingers.",
  "Hold floss taut between thumbs and index fingers.",
  "Gently slide floss between teeth — never snap it.",
  "Curve floss around each tooth in a C-shape.",
  "Move floss up and down against the tooth surface.",
  "Use a clean section of floss for each tooth.",
];

const mistakes = [
  { mistake: "Brushing too hard", fix: "Use gentle pressure. Hard brushing damages enamel and gums." },
  { mistake: "Not brushing long enough", fix: "Set a timer for 2 minutes or use an electric toothbrush with a timer." },
  { mistake: "Skipping flossing", fix: "Floss at least once daily — it reaches where brushes can't." },
  { mistake: "Using old toothbrush", fix: "Replace your toothbrush every 3 months or when bristles fray." },
  { mistake: "Brushing right after eating", fix: "Wait 30 minutes after acidic foods to protect enamel." },
];

export default function BrushingFlossingGuide() {
  return (
    <>
      <PageHero 
        eyebrow="Resource Guide" 
        title="Proper Brushing & Flossing Technique" 
        subtitle="Learn the correct methods from our dental hygiene experts."
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "Brushing & Flossing" }]}
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
            <h2 className="font-display text-3xl font-bold text-black">Why Technique Matters</h2>
            <p className="text-black/75">
              Proper brushing and flossing are the foundation of good oral health. Incorrect technique can leave plaque behind, leading to cavities, gum disease, and bad breath. Let's learn the right way.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold text-black">
                <Sparkles className="h-6 w-6 text-amber-600" />
                How to Brush Properly
              </h2>
              <ul className="space-y-3">
                {brushingSteps.map((step, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <span className="text-black/75">{step}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold text-black">
                <Droplets className="h-6 w-6 text-amber-600" />
                How to Floss Correctly
              </h2>
              <ul className="space-y-3">
                {flossingSteps.map((step, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <span className="text-black/75">{step}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-3xl font-bold text-black">Common Mistakes & How to Fix Them</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mistakes.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <p className="mb-2 font-semibold text-black">❌ {item.mistake}</p>
                <p className="text-sm text-black/70">✅ {item.fix}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-black">Pro Tips</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-amber-100 p-5 text-center">
              <Clock className="mx-auto mb-3 h-8 w-8 text-amber-600" />
              <p className="font-semibold text-black">2 Minutes</p>
              <p className="text-sm text-black/70">Brush for a full 2 minutes each time</p>
            </div>
            <div className="rounded-xl bg-amber-100 p-5 text-center">
              <Sun className="mx-auto mb-3 h-8 w-8 text-amber-600" />
              <p className="font-semibold text-black">Twice Daily</p>
              <p className="text-sm text-black/70">Morning and before bed</p>
            </div>
            <div className="rounded-xl bg-amber-100 p-5 text-center">
              <Droplets className="mx-auto mb-3 h-8 w-8 text-amber-600" />
              <p className="font-semibold text-black">Once Daily</p>
              <p className="text-sm text-black/70">Floss at least once a day</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 to-yellow-100 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold text-black">Need a Dental Check-up?</h2>
          <p className="mb-8 text-black/70">Our hygienists can demonstrate proper technique during your visit.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:bg-amber-600">
              <Calendar className="h-5 w-5" /> Book Check-up
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
