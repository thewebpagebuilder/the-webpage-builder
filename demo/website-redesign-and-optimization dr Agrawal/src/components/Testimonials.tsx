import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Mrs. Vaishali Gore", role: "Root Canal Patient", rating: 5, text: "The service I received felt so good that it motivated me to write a review. The doctor is really intelligent, the technology is advanced, and my root canal was truly pain-free." },
  { name: "Rohit Patil", role: "Aligner Patient", rating: 5, text: "I was conscious about my crooked teeth for years. Dr. Agrawal suggested invisible aligners and the digital preview blew my mind. In 10 months my smile completely changed." },
  { name: "Sneha Kulkarni", role: "Teeth Whitening", rating: 5, text: "Best teeth whitening experience in Nashik. The clinic is spotless, the staff explains every step, and the results were brighter than I expected." },
  { name: "Amit Deshmukh", role: "Dental Implant", rating: 5, text: "I was scared of implants, but the team made it comfortable. The surgery was quick and I could eat normally within days. Thank you Dr. Agrawal's team!" },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  return (
    <section id="reviews" className="bg-amber-50 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Patient Stories</span>
          <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">What Our Patients Say</h2>
        </motion.div>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="relative rounded-3xl bg-white p-8 shadow-lg sm:p-12">
              <Quote className="absolute right-8 top-8 h-12 w-12 text-amber-100" />
              <div className="mb-6 flex gap-1">{[...Array(testimonials[index].rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}</div>
              <p className="mb-8 text-lg leading-relaxed text-slate-700 sm:text-xl">&ldquo;{testimonials[index].text}&rdquo;</p>
              <div><p className="font-display text-lg font-bold text-black">{testimonials[index].name}</p><p className="text-sm text-slate-500">{testimonials[index].role}</p></div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-amber-300 hover:text-amber-600"><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex gap-2">{testimonials.map((_, i) => <button key={i} onClick={() => setIndex(i)} className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-amber-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`} />)}</div>
            <button onClick={() => setIndex((i) => (i + 1) % testimonials.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-amber-300 hover:text-amber-600"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
