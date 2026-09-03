"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if we've already shown the loader this session
    if (sessionStorage.getItem("loader_shown")) {
      setLoading(false);
      return;
    }

    let frame: number;
    const start = performance.now();
    const duration = 2200; // ms

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease the counter: fast then slow, just like a real loading bar
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("loader_shown", "1");
        }, 300);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          </div>

          {/* Logo + name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
              The Webpage Builder<span className="text-primary">.</span>
            </h1>
            <p className="text-muted-foreground text-sm font-light mt-2 tracking-wider uppercase">
              Engineering Digital Excellence
            </p>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mb-6"
          >
            <span className="font-mono text-6xl sm:text-7xl md:text-8xl font-bold text-foreground tabular-nums leading-none">
              {String(count).padStart(2, "0")}
            </span>
            <span className="font-mono text-2xl sm:text-3xl text-muted-foreground absolute -right-8 bottom-2">%</span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 sm:w-64 h-[1px] bg-border relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary"
              style={{ width: `${count}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Tagline cycles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-muted-foreground text-xs font-mono tracking-widest uppercase"
          >
            {count < 30 && "Initializing..."}
            {count >= 30 && count < 60 && "Loading assets..."}
            {count >= 60 && count < 90 && "Preparing experience..."}
            {count >= 90 && "Almost there..."}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
