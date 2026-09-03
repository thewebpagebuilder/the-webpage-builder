"use client";
import { motion } from "framer-motion";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";
import { Shield, Users, Zap, Award, Globe, Heart } from "lucide-react";

const VALUES = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your IP is sacred. We sign NDAs on every project and never reuse code or ideas across clients.",
    color: "hsl(168 76% 42%)",
  },
  {
    icon: Users,
    title: "Senior-Only Team",
    description: "No juniors learning on your dime. Every project is led by engineers with 5+ years of experience.",
    color: "hsl(42 85% 55%)",
  },
  {
    icon: Zap,
    title: "Speed & Quality",
    description: "We ship fast without cutting corners. 95+ Lighthouse scores, 99.9% uptime, and production-ready from day one.",
    color: "hsl(220 70% 55%)",
  },
  {
    icon: Award,
    title: "Craft Over Hype",
    description: "We care about the details. Pixel-perfect design, clean code, and thoughtful architecture.",
    color: "hsl(280 60% 55%)",
  },
  {
    icon: Globe,
    title: "Global, Remote-First",
    description: "Based in India, working with clients worldwide. 24/7 support across time zones.",
    color: "hsl(168 76% 42%)",
  },
  {
    icon: Heart,
    title: "Partnership, Not Vendor",
    description: "We're invested in your success. Your growth is our success metric.",
    color: "hsl(340 65% 55%)",
  },
];

const TIMELINE = [
  { year: "2020", event: "Founded", detail: "Started as a two-person studio. First client: a fintech startup in Bengaluru." },
  { year: "2021", event: "First 50 Clients", detail: "Expanded to e-commerce and SaaS. Hired our first senior full-stack engineer." },
  { year: "2022", event: "International Growth", detail: "First US and European clients. Built our first AI-integrated product." },
  { year: "2023", event: "Enterprise Tier", detail: "Launched dedicated enterprise offering. Nexus Analytics: 2M data points at 60fps." },
  { year: "2024", event: "350+ Clients", detail: "Expanded to mobile, cybersecurity, and real-time systems. 500+ projects delivered." },
];

export default function ClientPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-background relative overflow-hidden border-b border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="container px-5 sm:px-6 mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-4">/ About</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-[1.05]">
              We build digital<br className="hidden sm:block" />
              <span className="text-primary"> solutions that scale.</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl mb-10 leading-relaxed">
              Founded in 2020. 500+ projects delivered. 350+ happy clients. We're engineers first, agency second.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-12 sm:pt-16 border-t border-border max-w-3xl"
          >
            {[
              { value: "500+", label: "Projects" },
              { value: "350+", label: "Clients" },
              { value: "5+", label: "Years" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-24 md:py-32 bg-background border-b border-border">
        <div className="container px-5 sm:px-6 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-4">/ Our Story</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8">
              Engineers who fell in love with design.
            </h2>
            <div className="space-y-4 sm:space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed font-light">
              <p>
                The Webpage Builder started with a simple belief: most agencies talk about "digital transformation" but deliver cookie-cutter websites and broken promises.
              </p>
              <p>
                We're different. We're engineers who fell in love with design, or designers who learned to code — depending on who you ask. We build real software that solves real problems.
              </p>
              <p>
                From a fintech platform processing millions of transactions to an AI healthcare tool saving doctors 15 hours per week, we've helped startups and enterprises alike turn complex ideas into flawless digital realities.
              </p>
              <p className="text-foreground font-medium">
                No pitch decks. No buzzwords. Just exceptional engineering.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 sm:py-24 md:py-32 bg-background border-b border-border">
        <div className="container px-5 sm:px-6 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-4">/ Timeline</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Our journey so far.</h2>
          </motion.div>

          <div className="relative pl-8 sm:pl-12">
            {/* Vertical line */}
            <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-10 sm:space-y-12">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  {/* Node */}
                  <div className="absolute -left-[29px] sm:-left-[33px] w-3.5 h-3.5 rounded-full bg-primary border-2 border-background shadow-[0_0_8px_hsl(168_76%_42%/0.5)]" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1.5">
                    <span className="text-primary font-mono text-sm font-bold">{item.year}</span>
                    <h3 className="text-foreground font-semibold text-base sm:text-lg">{item.event}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24 md:py-32 bg-background border-b border-border">
        <div className="container px-5 sm:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-4">/ Our Values</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              The principles we ship by.
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-light max-w-2xl">
              These guide every decision — from architecture to client communication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, rotate: -0.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all group relative overflow-hidden"
                >
                  <div
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: `${value.color}15` }}
                  />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 sm:mb-5"
                    style={{ backgroundColor: `${value.color}15`, color: value.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
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
