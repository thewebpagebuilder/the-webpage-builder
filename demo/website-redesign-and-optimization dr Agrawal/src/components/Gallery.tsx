import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Smile Gallery</span>
            <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Real Results, Real Smiles</h2>
          </div>
          <a href="#/book" className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-200">
            <Camera className="h-4 w-4" /> Book Your Transformation
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="group relative overflow-hidden rounded-3xl md:col-span-2">
            <img src="https://i.vimeocdn.com/video/1724420056-6640452faba0bf1dbded185017498df4c2cb9d9cb08cba268b0a28de38de3d31-d" alt="Dr. Agrawal's Dental Clinic" className="warm-live-image h-80 w-full object-cover transition duration-700 group-hover:scale-105 md:h-[420px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wide">Featured</span>
              <h3 className="mt-2 font-display text-2xl font-bold">Complete Smile Makeover</h3>
              <p className="mt-1 text-sm text-slate-200">Aligners + whitening + contouring in under 8 months.</p>
            </div>
          </motion.div>
          <div className="grid gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="relative flex flex-col justify-between rounded-3xl bg-gradient-to-br from-amber-500 to-yellow-500 p-6 text-white">
              <div><p className="font-display text-4xl font-bold">5,000+</p><p className="text-sm opacity-90">Smile transformations</p></div>
              <a href="#/book" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Start yours now <ArrowRight className="h-4 w-4" /></a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="relative overflow-hidden rounded-3xl bg-slate-100">
              <img src="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-e7f0220.png" alt="Modern dental treatment room" className="warm-live-image h-48 w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/images/clinic-chair.jpg"; }} />
              <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-black">State-of-the-art clinic</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
