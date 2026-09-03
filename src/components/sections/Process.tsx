"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollToSection } from "@/lib/scroll";
import { Magnetic } from "../ui/Magnetic";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We deep-dive into your brand, gathering data and insights to architect a robust digital strategy. Understanding your 'why' is where every great partnership begins."
  },
  {
    number: "02",
    title: "Prototyping",
    description: "We design high-fidelity UI/UX mockups, focusing intensely on conversion and psychological flows. Every pixel is intentional. Every interaction choreographed."
  },
  {
    number: "03",
    title: "Engineering",
    description: "Our developers write scalable, clean code using modern frameworks to bring the designs to life beautifully. GSAP, Three.js, Next.js — the right tool for every job."
  },
  {
    number: "04",
    title: "Launch",
    description: "Rigorous QA testing, final deployments, and transferring the digital ecosystem to your control. Your launch is only the beginning of our journey together."
  }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background relative border-t border-border overflow-hidden" id="process" ref={containerRef}>
      <div className="container px-5 sm:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-8">

          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-32">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-muted-foreground font-mono text-xs sm:text-sm block mb-3 sm:mb-4"
              >
                / 01 — Our Process
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 sm:mb-6 text-foreground leading-[1.05]"
              >
                How we build the <span className="text-primary">impossible.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 font-light leading-relaxed"
              >
                Scroll to discover our method of turning extreme ideas into flawless digital realities. A proven four-stage approach, refined over 500+ projects and 5+ years.
              </motion.p>
              <Magnetic>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="h-12 px-7 sm:px-8 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all"
                >
                  Read Our Playbook
                </button>
              </Magnetic>
            </div>
          </div>

          <div className="lg:w-2/3 relative">
            {/* Animated scroll-linked line */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-border hidden md:block overflow-hidden">
              <motion.div
                className="w-full bg-primary"
                style={{ height: lineHeight, originY: 0 }}
              />
            </div>

            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {STEPS.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative md:pl-24"
                >
                  {/* Step node — glows when in view */}
                  <motion.div
                    className="absolute left-[-1.5rem] md:left-[1rem] top-1 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background border-2 border-border hidden md:flex items-center justify-center text-muted-foreground font-mono text-xs sm:text-sm z-10"
                    whileInView={{
                      borderColor: "hsl(168 76% 42%)",
                      color: "hsl(168 76% 42%)",
                      boxShadow: "0 0 20px hsl(168 76% 42% / 0.3)",
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.number}
                  </motion.div>

                  <motion.div
                    className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
                      <span className="md:hidden text-primary font-mono text-base sm:text-lg">
                        {step.number}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-light">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
