import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Phone, HeartPulse, Bone, Activity, Sparkles } from "lucide-react";
import PageHero from "../../components/PageHero";
import CTABanner from "../../components/CTABanner";

const steps = [
  { title: "Initial Consultation", desc: "Comprehensive examination with 3D CBCT scan to assess bone density and plan the implant position precisely." },
  { title: "Treatment Planning", desc: "Customized treatment plan using digital imaging to ensure optimal implant placement and aesthetics." },
  { title: "Implant Placement", desc: "Titanium implant is surgically placed into the jawbone under local anaesthesia. The procedure is comfortable and typically takes 1-2 hours." },
  { title: "Healing Period", desc: "Over 3-6 months, the implant fuses with your natural bone through osseointegration." },
  { title: "Abutment Placement", desc: "A small connector (abutment) is attached to the implant post." },
  { title: "Crown Placement", desc: "A custom-made crown that matches your natural teeth is placed, completing your new tooth." },
];

const benefits = [
  { icon: Bone, title: "Permanent Solution", desc: "Implants are designed to last a lifetime with proper care." },
  { icon: Activity, title: "Preserve Bone", desc: "Prevents bone loss that occurs with missing teeth." },
  { icon: HeartPulse, title: "Natural Look & Feel", desc: "Looks, feels and functions like your natural teeth." },
  { icon: Sparkles, title: "No Dietary Restrictions", desc: "Eat all your favourite foods without worry." },
];

const faqs = [
  { q: "Am I a candidate for dental implants?", a: "Most adults with good general health and adequate bone density are candidates. We'll assess your suitability during the consultation." },
  { q: "Is the implant procedure painful?", a: "The procedure is performed under local anaesthesia. Most patients report less discomfort than expected, similar to a tooth extraction." },
  { q: "How long do dental implants last?", a: "With proper care, dental implants can last a lifetime. The crown may need replacement after 10-15 years due to normal wear." },
  { q: "What is the cost of dental implants?", a: "Cost varies based on the number of implants needed and any preparatory procedures. We provide transparent pricing during consultation." },
];

export default function DentalImplantsGuide() {
  return (
    <>
      <PageHero 
        eyebrow="Resource Guide" 
        title="Complete Guide to Dental Implants" 
        subtitle="Everything you need to know about restoring your smile with dental implants."
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "Dental Implants Guide" }]}
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
            <h2 className="font-display text-3xl font-bold text-black">What are Dental Implants?</h2>
            <p className="text-black/75">
              Dental implants are titanium posts surgically placed into your jawbone to replace missing tooth roots. They provide a strong foundation for fixed or removable replacement teeth that are made to match your natural teeth.
            </p>
            <p className="text-black/75">
              Unlike dentures or bridges, implants don't require altering adjacent teeth. They look, feel, and function like your natural teeth, giving you the confidence to eat, speak, and smile without worry.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-display text-3xl font-bold text-black">The Implant Process: Step by Step</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-black">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-black">{step.title}</h3>
                  <p className="text-black/70">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-black">Why Choose Dental Implants?</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
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
          <h2 className="mb-8 font-display text-3xl font-bold text-black">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="mb-2 font-semibold text-black">{faq.q}</h3>
                <p className="text-black/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 to-yellow-100 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold text-black">Ready to Restore Your Smile?</h2>
          <p className="mb-8 text-black/70">Book a free consultation to learn if dental implants are right for you.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:bg-amber-600">
              <Calendar className="h-5 w-5" /> Book Free Consultation
            </Link>
            <a href="tel:+917498444051" className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-white px-6 py-3 font-semibold text-black transition hover:bg-amber-50">
              <Phone className="h-5 w-5" /> +91 74984 44051
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
