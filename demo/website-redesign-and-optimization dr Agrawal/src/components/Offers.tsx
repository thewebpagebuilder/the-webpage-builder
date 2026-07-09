import { motion } from "framer-motion";
import { Sparkles, Percent, Gift, ChevronRight } from "lucide-react";

const offers = [
  { icon: Sparkles, title: "Free Consultation", desc: "New patients get a complimentary oral health check-up and treatment plan.", cta: "Claim Now" },
  { icon: Percent, title: "20% Off Whitening", desc: "Brighten your smile with professional teeth whitening at a special price.", cta: "Book Whitening" },
  { icon: Gift, title: "Family Dental Package", desc: "Special discounts on preventive care packages for the whole family.", cta: "Know More" },
];

export default function Offers() {
  return (
    <section className="bg-gradient-to-br from-amber-500 to-yellow-500 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-100">Current Offers</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Start Your Smile Journey Today</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition hover:bg-white/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20"><offer.icon className="h-6 w-6" /></div>
              <h3 className="mb-2 font-display text-xl font-bold">{offer.title}</h3>
              <p className="mb-5 text-sm text-amber-50">{offer.desc}</p>
              <a href="#/book" className="inline-flex items-center gap-1 text-sm font-bold hover:underline">{offer.cta} <ChevronRight className="h-4 w-4" /></a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
