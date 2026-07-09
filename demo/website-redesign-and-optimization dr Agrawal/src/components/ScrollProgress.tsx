import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 origin-left"
      style={{ scaleX: progress / 100 }}
      initial={false}
      animate={{ scaleX: progress / 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    />
  );
}
