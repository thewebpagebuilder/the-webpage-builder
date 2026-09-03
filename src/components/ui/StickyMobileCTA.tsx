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
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-2.5 sm:p-3 bg-background/95 backdrop-blur-xl border-t border-border"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-xs sm:text-sm font-semibold truncate">Ready to start?</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs truncate">Free consultation today</p>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-primary text-primary-foreground text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 hover:opacity-90 active:scale-95 transition-all uppercase tracking-wide"
            >
              <Phone size={11} className="sm:w-3 sm:h-3" />
              Book a Call
              <ArrowRight size={11} className="sm:w-3 sm:h-3" />
            </a>
            <button
              onClick={() => { setDismissed(true); setVisible(false); }}
              className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-full border border-border"
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
