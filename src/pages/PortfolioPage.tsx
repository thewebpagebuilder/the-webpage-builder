import { SEO } from "../components/seo/SEO";
import { motion } from "framer-motion";
import { FeaturedWork } from "../components/sections/FeaturedWork";
import { ClientLogos } from "../components/sections/ClientLogos";
import { Testimonials } from "../components/sections/Testimonials";
import { GetQuotation } from "../components/sections/GetQuotation";
import { Contact } from "../components/sections/Contact";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "../lib/scroll";

export function PortfolioPage() {
  return (
    <>
      
      <SEO title="Portfolio | The Webpage Builder" description="The Webpage Builder - Portfolio. Premium 3D web development and custom AI software agency." url="https://thewebpagebuilder.in/portfolio" />{/* Page Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
        <div className="container px-5 sm:px-6 mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-4">/ Portfolio</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
              Selected work from<br className="hidden sm:block" /> 5+ years.
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-2xl mb-10 leading-relaxed">
              Nine signature projects. Each one a partnership in engineering digital excellence. From fintech to AI, e-commerce to enterprise SaaS.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection("work")}
                className="h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Explore Case Studies
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-zinc-900 border border-zinc-800 text-white font-semibold hover:bg-zinc-800 transition-colors text-sm sm:text-base"
              >
                Start a Project
              </button>
            </div>
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
