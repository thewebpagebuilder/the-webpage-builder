"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Search, BarChart3, Shield } from "lucide-react";
import { LeadFormModal } from "../ui/Modal";
import { scrollToSection } from "@/lib/scroll";
import { Magnetic } from "../ui/Magnetic";

const AUDIT_ITEMS = [
  { icon: Search, text: "Full website performance & SEO audit" },
  { icon: Zap, text: "Core Web Vitals & speed benchmark" },
  { icon: BarChart3, text: "Conversion bottleneck analysis" },
  { icon: Shield, text: "Security & accessibility review" },
];

export function FreeAudit() {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToContact = () => scrollToSection("contact", 80);

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background relative overflow-hidden border-t border-border">
      {/* Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[10px] uppercase tracking-widest font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-5 sm:mb-6">
              100% Free — No Strings Attached
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-foreground mb-5 sm:mb-6 leading-[1.1]">
              Get a free digital audit of your <span className="text-primary">business.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-10 max-w-lg">
              We'll analyze your website, app, or digital presence and deliver a custom report showing exactly where you're losing users — and how to fix it. Completely free. No pitch deck. Just real value.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {AUDIT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon size={15} />
                    </div>
                    <span className="text-foreground/80 text-xs sm:text-sm font-medium">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Magnetic>
                <button
                  onClick={() => setModalOpen(true)}
                  className="h-12 px-7 sm:px-8 bg-primary text-primary-foreground text-sm sm:text-base font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-200 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Claim Free Audit
                  <ArrowRight size={16} />
                </button>
              </Magnetic>
              <button
                onClick={scrollToContact}
                className="h-12 px-7 sm:px-8 bg-card border border-border text-foreground text-sm sm:text-base font-medium hover:bg-secondary transition-colors w-full sm:w-auto"
              >
                Schedule a Call Instead
              </button>
            </div>
          </motion.div>

          {/* Right — Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl border border-border bg-card relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/[0.06] rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 sm:space-y-8">
                {/* Mock audit result */}
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="text-muted-foreground text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                      Your Site Score
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                      We'll show you
                    </span>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl sm:text-6xl font-bold text-foreground">32</span>
                    <span className="text-muted-foreground text-base sm:text-lg mb-1">/100</span>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2">
                    Industry avg. for underperforming sites
                  </p>
                </div>

                {/* Progress bars mock */}
                <div className="space-y-4 sm:space-y-5">
                  {[
                    { label: "Performance", value: 28, color: "bg-red-400" },
                    { label: "SEO", value: 41, color: "bg-accent" },
                    { label: "Accessibility", value: 55, color: "bg-yellow-400" },
                    { label: "Best Practices", value: 68, color: "bg-primary" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] sm:text-xs mb-1.5 sm:mb-2">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-foreground/80 font-mono">{item.value}</span>
                      </div>
                      <div className="h-1.5 sm:h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Callout */}
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-secondary border border-border">
                  <p className="text-foreground text-xs sm:text-sm font-medium mb-1">
                    ⚡ You're leaving ₹{">"} 10L/year on the table.
                  </p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs">
                    Based on traffic, conversion rate, and avg. industry CAC
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <LeadFormModal open={modalOpen} onClose={() => setModalOpen(false)} variant="audit" />
    </section>
  );
}
