"use client";
import { motion } from "framer-motion";
import { Globe, Smartphone, Cpu, PenTool, Sparkles, Search } from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance websites and web applications built with modern frameworks for scale and speed — React, Next.js, and edge-deployed architectures.",
    highlights: ["Next.js", "React", "Three.js", "WebGL"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile experiences that engage users and drive business growth — Swift, Kotlin, and React Native.",
    highlights: ["iOS", "Android", "React Native"],
  },
  {
    icon: Cpu,
    title: "Custom Software",
    description: "Enterprise-grade software solutions engineered to streamline your unique business operations. Microservices, APIs, and scalable infrastructure.",
    highlights: ["Node.js", "Go", "Python", "Rust"],
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description: "User-centric design systems and interfaces that are intuitive, accessible, and visually striking — pixel-perfect aesthetics combined with conversion-focused psychology.",
    highlights: ["Prototyping", "Design Systems", "Interaction"],
  },
  {
    icon: Sparkles,
    title: "AI Solutions",
    description: "Integrating LLMs and machine learning to automate processes and create intelligent features — from smart assistants to real-time recommendation engines.",
    highlights: ["LLMs", "Vector DB", "Computer Vision"],
  },
  {
    icon: Search,
    title: "SEO & Growth",
    description: "Data-driven technical SEO and performance optimization to maximize your digital visibility, rankings, and sustainable organic growth.",
    highlights: ["Technical SEO", "Core Web Vitals", "Analytics"],
  }
];

export function Services() {
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

        {/* Main service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl bg-card border border-border hover:bg-secondary/40 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="relative z-10">
                  <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-secondary flex items-center justify-center mb-5 sm:mb-6 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon size={20} strokeWidth={1.75} className="sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm mb-5 sm:mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.highlights.map((h) => (
                      <span key={h} className="text-[11px] font-mono px-2 py-1 rounded-md bg-secondary border border-border text-muted-foreground group-hover:text-foreground transition-colors">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
