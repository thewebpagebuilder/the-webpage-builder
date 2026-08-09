"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const FAQS = [
  {
    question: "What's the typical project timeline?",
    answer: "Simple websites: 1–2 weeks. Complex web applications: 6–10 weeks. Enterprise software: 10–14 weeks. We always scope timelines precisely during the Discovery phase — no vague estimates, no surprises. If you have an urgent project, we can discuss accelerated timelines according to your requirements."
  },
  {
    question: "How much does it cost to hire The Webpage Builder?",
    answer: "Our projects typically range from ₹25K to ₹15L+ depending on scope and complexity. We don't do cheap work — we do exceptional work. Every project comes with a detailed SOW before we write a single line of code. The cost is an investment that pays for itself through growth."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Absolutely. Every project includes 30 days of post-launch support. For ongoing maintenance, feature development, and monitoring, we offer monthly retainers starting at ₹25K/month. Our 24/7 support team ensures zero downtime."
  },
  {
    question: "Can you work with our existing team?",
    answer: "Yes — we frequently collaborate with in-house teams. We can integrate as your extended engineering arm, design partners, or provide specialized expertise (like Three.js, GSAP, AI/ML) on demand. We adapt to your workflow, not the other way around."
  },
  {
    question: "What makes you different from other agencies?",
    answer: "Three things: (1) We are engineers, not marketers — our work speaks for itself. (2) Every project gets senior-level attention — no juniors learning on your dime. (3) We care about outcomes, not just output. Your growth is our success metric."
  },
  {
    question: "Do you sign NDAs? Is my project confidential?",
    answer: "Yes, we sign NDAs on every project. We never share your work, strategy, or code with anyone — not even other clients. Your intellectual property is legally and ethically protected."
  },
  {
    question: "Can I see examples of your work?",
    answer: "Our portfolio showcases selected projects across industries. Due to NDAs, some projects are shown as case studies with limited visual detail. We're happy to walk you through specific examples relevant to your needs during a call."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "React, Next.js, TypeScript, Three.js, GSAP, Node.js, Python, Rust, Swift, Kotlin, PostgreSQL, Kubernetes, and AI/ML (OpenAI, TensorFlow). We choose the best stack for your project — we're never locked into a single technology."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-zinc-950 border-t border-zinc-900 relative" id="faq">
      <div className="container px-5 sm:px-6 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-12 md:mb-16 text-center"
        >
          <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-3 sm:mb-4">/ Common Questions</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4 px-2">
            Everything you need to know.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light max-w-xl mx-auto px-2">
            We've answered the questions every potential client asks. If yours isn't here, just reach out.
          </p>
        </motion.div>

        <div className="space-y-0 divide-y divide-zinc-800/50">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between py-5 sm:py-6 text-left group cursor-pointer gap-4"
              >
                <span className={`text-sm sm:text-base md:text-lg font-medium pr-2 transition-colors ${openIndex === index ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all ${openIndex === index ? "bg-white text-black border-white" : "border-zinc-700 text-zinc-400 group-hover:border-zinc-500 group-hover:text-zinc-300"}`}>
                  {openIndex === index ? <Minus size={12} className="sm:w-[14px] sm:h-[14px]" /> : <Plus size={12} className="sm:w-[14px] sm:h-[14px]" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-zinc-400 leading-relaxed pb-5 sm:pb-6 text-sm sm:text-base font-light max-w-2xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 sm:mt-12 md:mt-14 text-center"
        >
          <p className="text-zinc-400 text-xs sm:text-sm mb-3 sm:mb-4">Still have questions?</p>
          <button
            onClick={() => scrollToSection("contact")}
            className="h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-colors inline-flex items-center gap-2"
          >
            Let's Talk — No Commitment
            <span className="text-zinc-400">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
