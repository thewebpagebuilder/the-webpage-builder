"use client";
import { motion } from "framer-motion";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { GetQuotation } from "@/components/sections/GetQuotation";
import { TechStack } from "@/components/sections/TechStack";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";


export default function ClientPage() {
  return (
    <>
      
      {/* Page Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
        <div className="container px-5 sm:px-6 mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-4">/ Services</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
              End-to-end digital<br className="hidden sm:block" /> product creation.
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-2xl mb-10 leading-relaxed">
              From strategy to launch and beyond. We bring together engineering, design, and product thinking to build solutions that scale.
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-white text-black font-semibold flex items-center gap-2 hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              Start Your Project
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      <Services />
      <Process />
      <WhyChooseUs />
      <GetQuotation />
      <TechStack />
      <FAQ />
      <Contact />
    </>
  );
}
