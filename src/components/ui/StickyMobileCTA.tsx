"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, X } from "lucide-react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed) {
        setVisible(window.scrollY > 600);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-2.5 sm:p-3 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs sm:text-sm font-semibold truncate">Ready to start?</p>
              <p className="text-zinc-400 text-[10px] sm:text-xs truncate">Free consultation today</p>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-white text-black text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 hover:bg-zinc-200 active:scale-95 transition-all"
            >
              <Phone size={11} className="sm:w-3 sm:h-3" />
              Book a Call
              <ArrowRight size={11} className="sm:w-3 sm:h-3" />
            </a>
            <button
              onClick={() => { setDismissed(true); setVisible(false); }}
              className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
