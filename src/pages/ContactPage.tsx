import { motion } from "framer-motion";
import { Contact } from "../components/sections/Contact";
import { FAQ } from "../components/sections/FAQ";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { openMail } from "../lib/scroll";

export function ContactPage() {
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
            <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-4">/ Contact</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
              Let's build something<br className="hidden sm:block" /> extraordinary.
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-2xl mb-10 leading-relaxed">
              Ready to scale your business? Partner with us to engineer your next digital solution.
            </p>
          </motion.div>

          {/* Quick contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-12 sm:pt-16 border-t border-zinc-900"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: "thewebpagebuilder@gmail.com",
                action: () => openMail("thewebpagebuilder@gmail.com", "Project Inquiry"),
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91 98765 43210",
                action: () => window.location.href = "tel:+919876543210",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "India (Remote Global)",
                action: null,
              },
              {
                icon: Clock,
                label: "Response Time",
                value: "< 24 hours",
                action: null,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              const hasAction = !!item.action;
              const Component = hasAction ? "button" : "div";
              return (
                <Component
                  key={i}
                  onClick={item.action || undefined}
                  className={`p-5 sm:p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 text-left group ${hasAction ? "hover:border-zinc-700 hover:bg-zinc-900/60 transition-all cursor-pointer" : ""}`}
                >
                  <Icon size={18} className="text-zinc-400 group-hover:text-white transition-colors mb-3 sm:w-5 sm:h-5" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium mb-1">
                    {item.label}
                  </div>
                  <div className="text-white text-sm sm:text-base font-medium">
                    {item.value}
                  </div>
                </Component>
              );
            })}
          </motion.div>

          {/* Bug reporting footnote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-8 text-xs text-zinc-650"
          >
            Noticed a technical issue? Send a direct{" "}
            <a
              href="mailto:thewebpagebuilder@gmail.com?subject=Bug%20Report&body=Describe%20the%20bug%20and%20steps%20to%20reproduce%3A"
              className="text-zinc-400 hover:text-white underline transition-colors"
            >
              Bug Report
            </a>{" "}
            to our engineering team.
          </motion.div>
        </div>
      </section>

      <Contact />
      <FAQ />
    </>
  );
}
