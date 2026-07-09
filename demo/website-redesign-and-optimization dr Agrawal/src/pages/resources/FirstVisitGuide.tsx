import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Phone, Clock, FileText, MessageCircle, CreditCard } from "lucide-react";
import PageHero from "../../components/PageHero";
import CTABanner from "../../components/CTABanner";

const checklist = [
  { icon: FileText, title: "Medical History", desc: "List of current medications, allergies, and past dental treatments" },
  { icon: CreditCard, title: "Insurance Card", desc: "If you have dental insurance, bring your card" },
  { icon: Clock, title: "Arrive Early", desc: "10 minutes early to complete registration" },
  { icon: MessageCircle, title: "Questions Ready", desc: "Note any concerns or questions you want to discuss" },
];

const whatToExpect = [
  { title: "Warm Welcome", desc: "Our friendly staff will greet you and help with registration." },
  { title: "Digital X-Rays", desc: "Low-radiation digital X-rays to assess your oral health." },
  { title: "Comprehensive Exam", desc: "Thorough examination of teeth, gums, and oral tissues." },
  { title: "Treatment Plan", desc: "Personalized recommendations with transparent pricing." },
  { title: "Q&A Time", desc: "All your questions answered — no rushing!" },
];

export default function FirstVisitGuide() {
  return (
    <>
      <PageHero 
        eyebrow="Resource Guide" 
        title="What to Expect During Your First Visit" 
        subtitle="Walkthrough of your initial consultation, examination, and treatment planning."
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "First Visit Guide" }]}
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
            <h2 className="font-display text-3xl font-bold text-black">Your First Visit to Dr. Agrawal's</h2>
            <p className="text-black/75">
              We understand that visiting a new dentist can feel overwhelming. That's why we've designed your first visit to be thorough yet comfortable, with plenty of time for you to ask questions and understand your options.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-display text-3xl font-bold text-black">What to Bring</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {checklist.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5"
              >
                <item.icon className="h-6 w-6 shrink-0 text-amber-600" />
                <div>
                  <h3 className="font-semibold text-black">{item.title}</h3>
                  <p className="text-sm text-black/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-display text-3xl font-bold text-black">Your Visit: Step by Step</h2>
          <div className="space-y-4">
            {whatToExpect.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-sm text-black">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-black">{step.title}</h3>
                  <p className="text-black/70">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 p-8 text-center">
            <h2 className="mb-4 font-display text-2xl font-bold text-black">Your Comfort is Our Priority</h2>
            <p className="mb-6 text-black/70">
              Our clinic is designed to make you feel relaxed. Enjoy our comfortable waiting area, gentle care, and a team that listens to your concerns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">✓ Painless procedures</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">✓ Clear communication</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">✓ No judgment</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 to-yellow-100 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold text-black">Ready for Your First Visit?</h2>
          <p className="mb-8 text-black/70">Book your appointment and experience dental care the way it should be.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:bg-amber-600">
              <Calendar className="h-5 w-5" /> Book Appointment
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
