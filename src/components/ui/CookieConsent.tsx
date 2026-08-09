"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay before showing
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-[99] rounded-2xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-xl p-5 shadow-2xl flex flex-col gap-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 flex-shrink-0">
                <Cookie size={18} />
              </div>
              <h4 className="text-sm font-semibold text-white">We value your privacy</h4>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="Dismiss cookie notice"
            >
              <X size={14} />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            We use cookies to analyze website traffic, customize templates, and improve your navigation experience. Read our{" "}
            <Link href="/privacy" className="text-white hover:underline">
              Privacy Policy
            </Link>{" "}
            to learn more.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 h-9 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 h-9 rounded-full bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs font-semibold hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
