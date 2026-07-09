import { motion } from "framer-motion";
import { WhyChooseUs } from "../components/sections/WhyChooseUs";
import { TechStack } from "../components/sections/TechStack";
import { Contact } from "../components/sections/Contact";
import { Shield, Users, Zap, Award, Globe, Heart } from "lucide-react";

const VALUES = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your IP is sacred. We sign NDAs on every project and never reuse code or ideas across clients.",
  },
  {
    icon: Users,
    title: "Senior-Only Team",
    description: "No juniors learning on your dime. Every project is led by engineers with 5+ years of experience.",
  },
  {
    icon: Zap,
    title: "Speed & Quality",
    description: "We ship fast without cutting corners. 95+ Lighthouse scores, 99.9% uptime, and production-ready from day one.",
  },
  {
    icon: Award,
    title: "Craft Over Hype",
    description: "We care about the details. Pixel-perfect design, clean code, and thoughtful architecture.",
  },
  {
    icon: Globe,
    title: "Global, Remote-First",
    description: "Based in India, working with clients worldwide. 24/7 support across time zones.",
  },
  {
    icon: Heart,
    title: "Partnership, Not Vendor",
    description: "We're invested in your success. Your growth is our success metric.",
  },
];

export function AboutPage() {
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
            <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-4">/ About</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
              We build digital<br className="hidden sm:block" /> solutions that scale.
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-2xl mb-10 leading-relaxed">
              Founded in 2020. 500+ projects delivered. 350+ happy clients. We're engineers first, agency second.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-12 sm:pt-16 border-t border-zinc-900 max-w-3xl"
          >
            {[
              { value: "500+", label: "Projects" },
              { value: "350+", label: "Clients" },
              { value: "5+", label: "Years" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-zinc-400 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-24 md:py-32 bg-zinc-950 border-t border-zinc-900">
        <div className="container px-5 sm:px-6 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
              Our Story
            </h2>
            <div className="space-y-4 sm:space-y-6 text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
              <p>
                The Webpage Builder started with a simple belief: most agencies talk about "digital transformation" but deliver cookie-cutter websites and broken promises.
              </p>
              <p>
                We're different. We're engineers who fell in love with design, or designers who learned to code — depending on who you ask. We build real software that solves real problems.
              </p>
              <p>
                From a fintech platform processing millions of transactions to an AI healthcare tool saving doctors 15 hours per week, we've helped startups and enterprises alike turn complex ideas into flawless digital realities.
              </p>
              <p className="text-white font-medium">
                No pitch decks. No buzzwords. Just exceptional engineering.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24 md:py-32 bg-zinc-950 border-t border-zinc-900">
        <div className="container px-5 sm:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-zinc-400 text-base sm:text-lg font-light max-w-2xl">
              These principles guide every decision we make, from architecture to client communication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="p-6 sm:p-7 rounded-2xl bg-zinc-900/30 border border-zinc-800/50"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 sm:mb-5 text-zinc-300">
                    <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <TechStack />
      <Contact />
    </>
  );
}
