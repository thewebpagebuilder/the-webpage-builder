import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope, Drill, Smile, Baby, Sparkles, Scan,
  Bone, HeartPulse, Scissors, CircleDot,
} from "lucide-react";

const services = [
  { icon: Stethoscope, title: "General Dentistry", desc: "Comprehensive check-ups, cleanings and fillings to keep your oral health in top shape." },
  { icon: Drill, title: "Root Canal Treatment", desc: "Painless, microscopically assisted root canals that save your natural tooth." },
  { icon: Bone, title: "Dental Implants", desc: "Permanent, natural-looking tooth replacement using world-class implant systems." },
  { icon: Scan, title: "Invisible Aligners", desc: "Clear, removable aligners to straighten teeth without metal braces." },
  { icon: Smile, title: "Cosmetic Dentistry", desc: "Veneers, smile makeovers and aesthetic bonding for a red-carpet smile." },
  { icon: Sparkles, title: "Teeth Whitening", desc: "Safe, professional whitening that brightens your smile by several shades." },
  { icon: Baby, title: "Pediatric Dentistry", desc: "Gentle, child-friendly dental care that builds healthy habits for life." },
  { icon: HeartPulse, title: "Gum Treatment", desc: "Advanced periodontal care to stop bleeding gums and protect your smile." },
  { icon: CircleDot, title: "Crowns & Bridges", desc: "Custom zirconia and ceramic crowns that restore strength and beauty." },
  { icon: Scissors, title: "Oral Surgery", desc: "Wisdom tooth removal, minor surgeries and biopsies with minimal discomfort." },
];

export default function Services({ limit, showCta = false }: { limit?: number; showCta?: boolean }) {
  const visible = limit ? services.slice(0, limit) : services;
  return (
    <section id="services" className="bg-amber-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Our Services</span>
          <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Complete Dental Care Under One Roof</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">From preventive care to complex smile makeovers, we offer a full spectrum of treatments using the latest technology.</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((service, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-md transition group-hover:scale-110"><service.icon className="h-6 w-6" /></div>
              <h3 className="mb-2 font-display text-lg font-bold text-black">{service.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
        {showCta && <div className="mt-12 text-center"><Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:from-amber-600 hover:to-yellow-600">View All Services →</Link></div>}
      </div>
    </section>
  );
}
