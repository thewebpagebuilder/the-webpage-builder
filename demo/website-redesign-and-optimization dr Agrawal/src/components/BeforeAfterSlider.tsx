import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

export default function BeforeAfterSlider({ beforeImage, afterImage, title, subtitle }: { beforeImage: string; afterImage: string; title: string; subtitle?: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPos((Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width) * 100);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
      <div className="mb-4 text-center"><h3 className="font-display text-xl font-bold text-black">{title}</h3>{subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}</div>
      <div ref={containerRef} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl cursor-ew-resize select-none" onMouseMove={(e) => handleMove(e.clientX)} onTouchMove={(e) => handleMove(e.touches[0].clientX)}>
        <img src={afterImage} alt="After" className="warm-live-image absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}><img src={beforeImage} alt="Before" className="warm-live-image h-full w-full object-cover" /></div>
        <div className="absolute inset-y-0 w-1 bg-white cursor-ew-resize shadow-lg" style={{ left: `${sliderPos}%` }}>
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"><ArrowLeftRight className="h-6 w-6 text-amber-600" /></div>
        </div>
        <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">BEFORE</div>
        <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">AFTER</div>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">Drag the slider to compare</p>
    </motion.div>
  );
}
