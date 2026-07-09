import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-amber-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-extrabold text-black sm:text-4xl">Ready for Your Best Smile?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-black/70">Book your appointment in under a minute. We'll confirm your slot instantly on WhatsApp.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-black shadow-lg transition hover:bg-amber-50"><Calendar className="h-5 w-5" /> Book Appointment</Link>
              <a href="tel:+917498444051" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-white/20 px-7 py-3.5 font-semibold text-black backdrop-blur transition hover:bg-white/40"><Phone className="h-5 w-5" /> +91 74984 44051</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
