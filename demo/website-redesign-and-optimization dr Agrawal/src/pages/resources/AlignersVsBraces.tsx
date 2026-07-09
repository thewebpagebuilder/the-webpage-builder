import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Calendar, Phone, Sparkles, Timer, Smile, ThumbsUp } from "lucide-react";
import PageHero from "../../components/PageHero";
import CTABanner from "../../components/CTABanner";

const comparison = [
  { feature: "Appearance", aligners: "Nearly invisible, clear plastic", braces: "Visible metal brackets and wires" },
  { feature: "Removability", aligners: "Remove for eating and brushing", braces: "Fixed in place" },
  { feature: "Comfort", aligners: "Smooth plastic, less irritation", braces: "May cause mouth sores initially" },
  { feature: "Maintenance", aligners: "Easy to clean, no food restrictions", braces: "Avoid certain foods, special brushing needed" },
  { feature: "Treatment Time", aligners: "6-18 months typically", braces: "18-36 months typically" },
  { feature: "Visits", aligners: "Fewer visits, every 6-8 weeks", braces: "Monthly adjustments needed" },
];

const alignerBenefits = [
  { icon: Sparkles, title: "Virtually Invisible", desc: "Most people won't notice you're wearing them." },
  { icon: Timer, title: "Faster Treatment", desc: "Many cases complete in 12-18 months." },
  { icon: Smile, title: "Eat What You Love", desc: "Remove aligners to enjoy all your favorite foods." },
  { icon: ThumbsUp, title: "More Comfortable", desc: "No metal brackets or wires to irritate your mouth." },
];

export default function AlignersVsBraces() {
  return (
    <>
      <PageHero 
        eyebrow="Resource Guide" 
        title="Aligners vs Braces: Which is Right for You?" 
        subtitle="Compare treatment options, costs, and timelines to make an informed decision."
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "Aligners vs Braces" }]}
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
            <h2 className="font-display text-3xl font-bold text-black">Understanding Your Options</h2>
            <p className="text-black/75">
              Both traditional braces and clear aligners are effective orthodontic treatments. The right choice depends on your specific dental needs, lifestyle, and preferences. Let's explore each option.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-black">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-amber-200">
                  <th className="px-4 py-3 text-left font-semibold text-black">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-black">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-500" /> Clear Aligners
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-black">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-slate-400" /> Traditional Braces
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={index} className="border-b border-amber-100">
                    <td className="px-4 py-4 font-medium text-black">{row.feature}</td>
                    <td className="px-4 py-4 text-black/75">{row.aligners}</td>
                    <td className="px-4 py-4 text-black/75">{row.braces}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-black">Why Patients Choose Aligners</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {alignerBenefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <benefit.icon className="mb-3 h-8 w-8 text-amber-600" />
                <h3 className="mb-2 font-display text-lg font-bold text-black">{benefit.title}</h3>
                <p className="text-sm text-black/70">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-black">When Braces May Be Better</h2>
          <p className="mb-6 text-black/75">
            While aligners work well for most cases, traditional braces may be recommended for:
          </p>
          <ul className="ml-4 space-y-3 text-black/75">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <span>Complex bite problems (overbite, underbite, crossbite)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <span>Severely rotated or impacted teeth</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <span>Teeth that need significant vertical movement</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <span>Patients who may not wear aligners consistently</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 to-yellow-100 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold text-black">Not Sure Which to Choose?</h2>
          <p className="mb-8 text-black/70">Book a free consultation and let us help you decide the best option for your smile.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:bg-amber-600">
              <Calendar className="h-5 w-5" /> Get Free Assessment
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
