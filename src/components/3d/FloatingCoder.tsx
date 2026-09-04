"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";


export function HeroFloatingCoder() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="flex items-center justify-center w-full h-full relative perspective-[1000px]">
      <motion.div
        className="relative w-full max-w-sm aspect-square"
        style={{ rotateX, rotateY }}
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-90" />
        <Image
          src="/3d-coder.png"
          alt="3D Coder"
          fill
          className="object-contain drop-shadow-2xl z-10"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  );
}

// ----- Standalone section version (kept for re-use) -----
export function FloatingCoderSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative py-0 bg-background overflow-hidden border-t border-border">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[550px] sm:min-h-[600px] md:min-h-[700px]">
          {/* Left: Text */}
          <div className="py-16 sm:py-20 lg:py-0">
            <span className="inline-block text-[10px] uppercase tracking-widest font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-5 sm:mb-6">
              👾 Meet the Team
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-5 leading-[1.05]">
              Senior engineers,<br />
              <span className="text-primary">not juniors.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed max-w-md mb-8">
              Every project is handled by a senior-level engineer who ships clean, scalable code. No middlemen, no juniors learning on your dime — just craftsmanship.
            </p>
            <div className="flex flex-wrap gap-3">
              {["TypeScript", "React", "Three.js", "Rust", "Go", "AI/ML"].map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Realistic 3D Image floating fast */}
          <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-full w-full relative perspective-[1000px] flex items-center justify-center">
            <motion.div
              className="relative w-full max-w-md aspect-square"
              style={{ rotateX, rotateY }}
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
              <Image
                src="/3d-coder.png"
                alt="Realistic 3D Coder"
                fill
                className="object-contain drop-shadow-2xl z-10"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
