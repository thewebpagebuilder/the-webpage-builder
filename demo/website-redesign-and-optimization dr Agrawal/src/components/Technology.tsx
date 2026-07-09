import { motion } from "framer-motion";
import { Scan, ScanFace, ScanLine, Monitor, Syringe } from "lucide-react";

const techs = [
  { icon: Scan, title: "Intra-Oral Scanner", desc: "Digital impressions in minutes — no more messy moulds." },
  { icon: ScanFace, title: "3D Smile Simulation", desc: "See your new smile before treatment even begins." },
  { icon: ScanLine, title: "Digital X-Rays", desc: "Low-radiation imaging for faster, safer diagnosis." },
  { icon: Monitor, title: "CAD/CAM Dentistry", desc: "Same-day crowns and bridges designed with precision." },
  { icon: Syringe, title: "Painless Anaesthesia", desc: "Computer-controlled delivery for a stress-free experience." },
];

export default function Technology() {
  return (
    <section id="technology" className="bg-white py-20 text-black sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
            <img
              src="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-e7f0220.png/:/cr=t:2.83%25,l:2.83%25,w:94.34%25,h:94.34%25/rs=w:365,h:365,cg:true,m"
              alt="Advanced dental technology"
              className="warm-live-image rounded-3xl shadow-2xl shadow-amber-200/60"
              onError={(e) => { (e.target as HTMLImageElement).src = "/images/clinic-chair.jpg"; }}
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 lg:order-2">
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-400">Advanced Technology</span>
            <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Experience Dentistry's Digital Revolution</h2>
            <p className="mt-4 text-black/70">We invest in the latest equipment to make your visit faster, safer and more comfortable every single time.</p>
            <div className="mt-8 space-y-4">
              {techs.map((tech, index) => (
                <div key={index} className="flex items-start gap-4 rounded-2xl bg-amber-50 p-4 transition hover:bg-amber-100">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600"><tech.icon className="h-6 w-6" /></div>
                  <div><h3 className="font-display font-bold text-black">{tech.title}</h3><p className="text-sm text-black/65">{tech.desc}</p></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
