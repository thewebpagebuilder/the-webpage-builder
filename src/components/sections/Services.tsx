"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Smartphone, Cpu, PenTool, Sparkles, Search, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance websites and web applications built with modern frameworks for scale and speed — React, Next.js, and edge-deployed architectures.",
    highlights: ["Next.js", "React", "Three.js", "WebGL"],
    accent: "hsl(168 76% 42%)",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile experiences that engage users and drive business growth — Swift, Kotlin, and React Native.",
    highlights: ["iOS", "Android", "React Native"],
    accent: "hsl(42 85% 55%)",
  },
  {
    icon: Cpu,
    title: "Custom Software",
    description: "Enterprise-grade software solutions engineered to streamline your unique business operations. Microservices, APIs, and scalable infrastructure.",
    highlights: ["Node.js", "Go", "Python", "Rust"],
    accent: "hsl(220 70% 55%)",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description: "User-centric design systems and interfaces that are intuitive, accessible, and visually striking — pixel-perfect aesthetics combined with conversion-focused psychology.",
    highlights: ["Prototyping", "Design Systems", "Interaction"],
    accent: "hsl(340 65% 55%)",
  },
  {
    icon: Sparkles,
    title: "AI Solutions",
    description: "Integrating LLMs and machine learning to automate processes and create intelligent features — from smart assistants to real-time recommendation engines.",
    highlights: ["LLMs", "Vector DB", "Computer Vision"],
    accent: "hsl(280 60% 55%)",
  },
  {
    icon: Search,
    title: "SEO & Growth",
    description: "Data-driven technical SEO and performance optimization to maximize your digital visibility, rankings, and sustainable organic growth.",
    highlights: ["Technical SEO", "Core Web Vitals", "Analytics"],
    accent: "hsl(150 60% 45%)",
  }
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background relative border-t border-border overflow-hidden" id="services">
      <div className="container px-5 sm:px-6 mx-auto">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground font-mono text-xs sm:text-sm block mb-3 sm:mb-4"
          >
            / Capabilities
          </motion.span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-foreground leading-[1.05]"
            >
              Global Digital<br className="hidden sm:block" /> <span className="text-primary">Solutions.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base sm:text-lg max-w-md font-light leading-relaxed"
            >
              End-to-end premium 3D web development and scalable AI enterprise solutions engineered for global audiences.
            </motion.p>
          </div>
        </div>

        {/* Interactive service accordion list */}
        <div className="space-y-0 border-t border-border">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="border-b border-border group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="py-6 sm:py-8 md:py-10 flex items-center gap-4 sm:gap-6 md:gap-8">
                  {/* Number */}
                  <span className="text-muted-foreground font-mono text-xs sm:text-sm w-8 flex-shrink-0">
                    0{index + 1}
                  </span>

                  {/* Accent bar */}
                  <motion.div
                    className="w-1 h-8 sm:h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: service.accent }}
                    animate={{ scaleY: isHovered ? 1.5 : 1, opacity: isHovered ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{
                      backgroundColor: isHovered ? service.accent : "hsl(var(--secondary))",
                      color: isHovered ? "white" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight flex-1">
                    {service.title}
                  </h3>

                  {/* Arrow */}
                  <motion.div
                    animate={{ x: isHovered ? 0 : -8, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ArrowRight size={20} className="text-muted-foreground" />
                  </motion.div>
                </div>

                {/* Expandable detail */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 sm:pb-8 pl-12 sm:pl-[4.5rem] md:pl-[5.5rem] pr-4 sm:pr-8">
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4 max-w-2xl">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.highlights.map((h) => (
                            <span
                              key={h}
                              className="text-[11px] font-mono px-2.5 py-1 rounded-md border text-muted-foreground transition-colors"
                              style={{
                                borderColor: `${service.accent}33`,
                                backgroundColor: `${service.accent}0a`,
                              }}
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
