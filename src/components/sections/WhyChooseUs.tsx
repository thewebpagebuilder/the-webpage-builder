"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Clock, TrendingUp, Users, Award } from "lucide-react";

const REASONS = [
  {
    icon: Shield,
    title: "Client Privacy Guaranteed",
    description: "Your project stays yours. We never share work across clients. Every solution is built exclusively for your vision.",
    highlight: "NDA-Ready"
  },
  {
    icon: Zap,
    title: "Production-Ready from Day 1",
    description: "No prototypes-only. We deliver scalable, production-grade software from sprint one — designed to handle real traffic and growth.",
    highlight: "Zero Tech Debt"
  },
  {
    icon: Clock,
    title: "24/7 Support, Always On",
    description: "Our global support team ensures zero downtime for your business. We don't sleep so your platform never goes down.",
    highlight: "99.9% SLA"
  },
  {
    icon: TrendingUp,
    title: "Growth-First Engineering",
    description: "Every line of code we write is optimized for conversion, speed, and SEO. We don't just build websites — we build revenue engines.",
    highlight: "95+ Lighthouse"
  },
  {
    icon: Users,
    title: "Dedicated Team, Not Freelancers",
    description: "A cross-functional squad of senior engineers, designers, and strategists assigned to your project — not random contractors.",
    highlight: "Senior-Only"
  },
  {
    icon: Award,
    title: "Award-Winning Craft",
    description: "Our work has been recognized by industry leaders. We build to a standard, not just to a spec. Quality is non-negotiable.",
    highlight: "500+ Projects"
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-3 sm:mb-4">/ Why Us</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-white leading-[1.05]">
              Not just another<br className="hidden sm:block" /> agency.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-md font-light leading-relaxed">
              We are engineers first. We solve problems with code, not with pitch decks. Here's why 350+ clients chose us — and stayed.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                whileHover={{ y: -4 }}
                className="group p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/[0.02] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4 sm:mb-5 gap-3">
                    <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-300 group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0">
                      <Icon size={18} strokeWidth={1.75} className="sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-medium text-zinc-400 bg-zinc-800/50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-zinc-800 group-hover:text-emerald-400 group-hover:border-emerald-400/20 group-hover:bg-emerald-400/5 transition-colors whitespace-nowrap">
                      {reason.highlight}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-2.5 leading-snug">
                    {reason.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
