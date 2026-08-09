"use client";
import { motion } from "framer-motion";

const CLIENTS = [
  "Vault Finance",
  "MediSync AI",
  "Luxe Commerce",
  "Orbital Analytics",
  "Voltera Motors",
  "Studio Alpha",
  "Horizon Finance",
  "Aura Branding",
  "Elevate Workspace",
  "Quantum Core",
  "Flow CRM",
  "Vanguard App",
];

const TRUST_ITEMS = [
  { value: "500+", label: "Projects Shipped" },
  { value: "350+", label: "Happy Clients" },
  { value: "4.9★", label: "Client Rating" },
  { value: "5+", label: "Years in Business" },
];

export function ClientLogos() {
  const logos = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-zinc-950 relative z-10 overflow-hidden">
      {/* Trust stat bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container px-5 sm:px-6 mx-auto mb-12 sm:mb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{item.value}</div>
              <div className="text-zinc-400 text-[10px] sm:text-xs uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Logos marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -2800] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          }}
        >
          {logos.map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-4 sm:gap-8 px-3 sm:px-8 group"
            >
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-zinc-800/50 group-hover:border-zinc-700 transition-colors bg-zinc-900/30 group-hover:bg-zinc-900/60">
                {/* Initials avatar */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] sm:text-xs font-bold text-zinc-400 group-hover:text-white transition-colors flex-shrink-0">
                  {client.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <span className="text-xs sm:text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors whitespace-nowrap">
                  {client}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
