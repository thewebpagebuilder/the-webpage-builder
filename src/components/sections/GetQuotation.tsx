"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, FileText, Clock, CheckCircle2 } from "lucide-react";
import { LeadFormModal } from "../ui/Modal";

const QUOTATION_FEATURES = [
  {
    icon: FileText,
    title: "Detailed Breakdown",
    description: "Line-item costs for every feature, deliverable, and milestone.",
  },
  {
    icon: Clock,
    title: "24-Hour Turnaround",
    description: "Senior engineer reviews your requirements and sends a custom quote within a day.",
  },
  {
    icon: CheckCircle2,
    title: "Zero Obligation",
    description: "The quote is yours to keep — no sales calls, no follow-up pressure.",
  },
];

export function GetQuotation() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-400/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative p-6 sm:p-10 md:p-14 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-zinc-900/80 via-zinc-900/40 to-blue-950/20 overflow-hidden"
          >
            {/* Inner glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Left: Copy */}
              <div className="lg:col-span-3">
                <span className="inline-block text-[10px] uppercase tracking-widest font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-full mb-5 sm:mb-6">
                  ⚡ Instant Quote · Free
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4 sm:mb-5 leading-[1.1]">
                  Get your custom<br className="hidden sm:block" /> quotation now.
                </h2>
                <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-10 max-w-xl">
                  Skip the back-and-forth. Tell us about your project and we'll send a detailed, itemized quote with timeline and tech stack — within 24 hours, completely free.
                </p>

                <button
                  onClick={() => setModalOpen(true)}
                  className="h-12 sm:h-14 px-7 sm:px-10 rounded-full bg-blue-400 text-zinc-950 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-blue-300 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-3 shadow-lg shadow-blue-400/20"
                >
                  <Calculator size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Get Your Quotation Now
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>

                <p className="text-zinc-400 text-[11px] sm:text-xs mt-4 sm:mt-5">
                  No credit card · No sales pitch · Takes 2 minutes
                </p>
              </div>

              {/* Right: Features */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                {QUOTATION_FEATURES.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:border-blue-400/30 transition-colors"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-400/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white text-sm font-semibold mb-1">{feature.title}</h3>
                        <p className="text-zinc-400 text-xs leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <LeadFormModal open={modalOpen} onClose={() => setModalOpen(false)} variant="quotation" />
    </section>
  );
}
