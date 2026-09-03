"use client";
import { motion } from "framer-motion";
import { Hero3D } from "../3d/Hero3D";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { Marquee } from "../ui/Marquee";
import { Magnetic } from "../ui/Magnetic";
import { scrollToSection } from "@/lib/scroll";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Ambient background glow bubbles — new teal/gold palette */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[hsl(168_76%_42%/0.04)] rounded-full blur-[120px] pointer-events-none animate-float-glow" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[hsl(42_85%_55%/0.04)] rounded-full blur-[100px] pointer-events-none animate-float-glow-alt" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-[hsl(220_60%_50%/0.03)] rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

      <Hero3D />

      <div className="container relative z-10 px-5 sm:px-6 mx-auto flex-1 flex items-center justify-center py-16 sm:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              className="lg:col-span-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
                }}
                className="overflow-hidden mb-6"
              >
                <span className="inline-block py-2 px-4 border border-border text-muted-foreground text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                  The Webpage Builder
                </span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tighter mb-8 text-foreground leading-[0.95] uppercase">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98] } },
                  }}
                  className="block"
                >
                  Engineering
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98] } },
                  }}
                  className="block text-primary"
                >
                  Digital Futures
                </motion.span>
              </h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                }}
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mb-12 leading-relaxed"
              >
                We are a premium digital agency crafting hyper-optimized, interactive web experiences and enterprise software.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              >
                <Magnetic>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="group relative h-14 px-8 bg-primary text-primary-foreground text-sm font-bold tracking-wider uppercase overflow-hidden animate-glow-pulse"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start a Project
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </button>
                </Magnetic>
                <Magnetic>
                  <button
                    onClick={() => scrollToSection("work")}
                    className="group relative h-14 px-8 bg-transparent border border-foreground text-foreground text-sm font-bold tracking-wider uppercase overflow-hidden hover:text-background transition-colors duration-300"
                  >
                    <span className="relative z-10">View Our Work</span>
                    <div className="absolute inset-0 bg-foreground translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                  </button>
                </Magnetic>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-4 grid grid-cols-2 gap-4 lg:gap-8 border-l border-border pl-0 lg:pl-8 mt-12 lg:mt-0"
            >
              <div className="flex flex-col">
                <AnimatedCounter
                  target={500}
                  suffix="+"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2"
                  label=""
                  duration={2}
                />
                <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                  Projects Completed
                </span>
              </div>
              <div className="flex flex-col">
                <AnimatedCounter
                  target={350}
                  suffix="+"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2"
                  label=""
                  duration={2.2}
                />
                <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                  Happy Clients
                </span>
              </div>
              <div className="flex flex-col col-span-2 mt-4 lg:mt-8 pt-4 lg:pt-8 border-t border-border">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent tabular-nums mb-2">
                  24/7
                </span>
                <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                  Global Support
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee sections */}
      <div className="w-full relative z-10 border-y border-border bg-card/80 backdrop-blur-sm">
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
        <div className="h-px w-full bg-border" />
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
