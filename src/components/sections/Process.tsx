import { motion } from "framer-motion";
import { scrollToSection } from "../../lib/scroll";

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
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden" id="process">
      <div className="container px-5 sm:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-8">

          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-32">
              <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-3 sm:mb-4">/ 01 — Our Process</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 sm:mb-6 text-white leading-[1.05]">
                How we build the impossible.
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-8 sm:mb-10 font-light leading-relaxed">
                Scroll to discover our method of turning extreme ideas into flawless digital realities. A proven four-stage approach, refined over 500+ projects and 5+ years.
              </p>
              <button
                onClick={() => scrollToSection("contact")}
                className="h-12 px-7 sm:px-8 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
              >
                Read Our Playbook
              </button>
            </div>
          </div>

          <div className="lg:w-2/3 relative">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-zinc-800 via-zinc-800/50 to-transparent hidden md:block" />

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
                  <div className="absolute left-[-1.5rem] md:left-[1rem] top-1 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-950 border border-zinc-800 hidden md:flex items-center justify-center text-zinc-400 font-mono text-xs sm:text-sm z-10">
                    {step.number}
                  </div>

                  <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
                      <span className="md:hidden text-zinc-400 font-mono text-base sm:text-lg">
                        {step.number}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-light">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
