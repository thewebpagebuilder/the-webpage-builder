import { motion } from "framer-motion";
import { UserCheck, Users, MonitorSmartphone, ShieldCheck, BadgeIndianRupee, PhoneCall } from "lucide-react";

const reasons = [
  { icon: UserCheck, title: "Personalised Care", desc: "Every treatment plan is tailored to your goals, comfort and budget." },
  { icon: Users, title: "Expert Dentists", desc: "Experienced specialists in orthodontics, implants and cosmetic dentistry." },
  { icon: MonitorSmartphone, title: "Digital Clinic", desc: "Intra-oral scanners, digital X-rays and 3D planning for precision results." },
  { icon: ShieldCheck, title: "Sterilisation First", desc: "Hospital-grade infection control protocols for your complete safety." },
  { icon: BadgeIndianRupee, title: "Transparent Pricing", desc: "Clear cost estimates upfront. No surprise charges, ever." },
  { icon: PhoneCall, title: "Follow-Up Care", desc: "We stay connected after treatment with reminders and check-up calls." },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Why Choose Us</span>
            <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Trusted by Thousands for a Reason</h2>
            <p className="mt-4 text-slate-600">We don't just treat teeth; we build long-term relationships based on trust, transparency and exceptional results.</p>
            <a href="#/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:from-amber-600 hover:to-yellow-600">Schedule a Visit →</a>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-amber-200 hover:bg-amber-50/50">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm"><reason.icon className="h-5 w-5" /></div>
                <h3 className="mb-1 font-display font-bold text-black">{reason.title}</h3>
                <p className="text-sm text-slate-600">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
