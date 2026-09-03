"use client";
import { motion } from "framer-motion";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Testimonials } from "@/components/sections/Testimonials";
import { GetQuotation } from "@/components/sections/GetQuotation";
import { Contact } from "@/components/sections/Contact";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const CATEGORIES = [
  { label: "All", count: 9 },
  { label: "E-Commerce", count: 2 },
  { label: "SaaS", count: 3 },
  { label: "Mobile", count: 2 },
  { label: "AI / ML", count: 1 },
  { label: "Web Experience", count: 1 },
];

export default function ClientPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-background relative overflow-hidden border-b border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -right-40 top-20 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="container px-5 sm:px-6 mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-4">/ Portfolio</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-[1.05]">
              Selected work from<br className="hidden sm:block" />
              <span className="text-primary"> 5+ years.</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl mb-8 sm:mb-10 leading-relaxed">
              Nine signature projects. Each one a partnership in engineering digital excellence. From fintech to AI, e-commerce to enterprise SaaS.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection("work")}
                className="h-12 sm:h-14 px-8 sm:px-10 bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base uppercase tracking-wide"
              >
                Explore Case Studies
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="h-12 sm:h-14 px-8 sm:px-10 bg-card border border-border text-foreground font-medium hover:bg-secondary transition-colors text-sm sm:text-base"
              >
                Start a Project
              </button>
            </div>
          </motion.div>

          {/* Category filter row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 sm:mt-16 flex flex-wrap gap-2 sm:gap-3"
          >
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                className={`h-9 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-medium transition-all border ${
                  i === 0
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat.label}
                <span className="ml-1.5 text-[10px] opacity-60">({cat.count})</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <ClientLogos />
      <FeaturedWork />
      <Testimonials />
      <GetQuotation />
      <Contact />
    </>
  );
}
