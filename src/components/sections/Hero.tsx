import { motion } from "framer-motion";
import { Hero3D } from "../3d/Hero3D";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { Marquee } from "../ui/Marquee";
import { scrollToSection } from "../../lib/scroll";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Ambient background glow bubbles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none animate-float-glow" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none animate-float-glow-alt" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-indigo-500/[0.03] rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

      <Hero3D />

      <div className="container relative z-10 px-5 sm:px-6 mx-auto flex-1 flex items-center justify-center py-16 sm:py-20">
        <div className="max-w-5xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1.5 px-3 sm:px-4 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium tracking-wide mb-6 sm:mb-8 backdrop-blur-sm">
              THE WEBPAGE BUILDER
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 leading-[1.05]">
              THE PREMIUM WEB APP <br className="hidden sm:block" /> AND SOFTWARE DEVELOPMENT AGENCY
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-3 sm:mb-4 leading-relaxed px-2 sm:px-0">
              Engineering enterprise React applications, WebGL experiences, and scalable solutions.
            </p>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-10 sm:mb-14 px-2 sm:px-0">
              We build the technology that scales your business worldwide.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="h-12 px-7 sm:px-8 rounded-full bg-white text-black text-sm sm:text-base font-medium hover:bg-zinc-200 transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Start a Project
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className="h-12 px-7 sm:px-8 rounded-full bg-zinc-900/80 border border-zinc-800 text-white text-sm sm:text-base font-medium hover:bg-zinc-800 transition-colors w-full sm:w-auto backdrop-blur-sm"
            >
              View Our Work
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 sm:mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 border-t border-zinc-800/50 pt-8 sm:pt-12"
          >
            <div className="text-left md:text-center">
              <AnimatedCounter
                target={500}
                suffix="+"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white"
                label="Projects Completed"
                duration={2}
              />
            </div>
            <div className="text-left md:text-center">
              <AnimatedCounter
                target={350}
                suffix="+"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white"
                label="Happy Clients"
                duration={2.2}
              />
            </div>
            <div className="text-left md:text-center col-span-2 md:col-span-1">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tabular-nums">
                  24/7
                </span>
                <span className="text-zinc-400 text-[10px] sm:text-xs font-medium tracking-wider uppercase mt-1">
                  Global Support
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee sections */}
      <div className="w-full relative z-10 border-y border-zinc-900 bg-zinc-950/80 backdrop-blur-sm">
        <Marquee
          items={[
            "Web Development",
            "UI/UX Design",
            "Software Architecture",
            "Mobile Apps",
            "AI Solutions",
            "SEO & Growth",
            "3D / WebGL",
            "Brand Systems",
          ]}
          speed="normal"
          direction="left"
          variant="hollow"
        />
        <div className="h-px w-full bg-zinc-900" />
        <Marquee
          items={[
            "React",
            "Next.js",
            "Three.js",
            "GSAP",
            "Node.js",
            "Python",
            "TypeScript",
            "Tailwind CSS",
            "Kubernetes",
            "PostgreSQL",
            "Rust",
            "Swift",
            "Kotlin",
          ]}
          speed="faster"
          direction="right"
          variant="default"
          className="py-1"
        />
      </div>
    </section>
  );
}
