"use client";
import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: "slower" | "normal" | "faster";
  direction?: "left" | "right";
  className?: string;
  variant?: "default" | "hollow";
}

export function Marquee({
  items,
  speed = "normal",
  direction = "left",
  className = "",
  variant = "default",
}: MarqueeProps) {
  const duration = speed === "slower" ? 40 : speed === "faster" ? 20 : 30;
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative flex overflow-hidden w-full ${className}`}>
      {/* Edge fades - smaller on mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: direction === "left" ? [0, -1400] : [-1400, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration,
          ease: "linear",
        }}
      >
        {repeated.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 sm:gap-6 px-4 sm:px-8 py-3 sm:py-4 ${
              variant === "hollow"
                ? "text-zinc-400/70 font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-xs md:text-sm"
                : "text-zinc-400/80 font-mono uppercase text-[10px] sm:text-xs md:text-sm"
            }`}
          >
            <span>{item}</span>
            {variant === "default" && (
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
