"use client";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";

// Curtain wipe page transition — slides in from bottom on navigate out, slides up to reveal new page
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Full-screen curtain wipe overlay (separate from content fade)
export function PageCurtain() {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={`curtain-${pathname}`}
        initial={{ scaleY: 1, originY: 0 }}
        animate={{ scaleY: 0, originY: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9000] bg-primary pointer-events-none"
      />
    </AnimatePresence>
  );
}
