import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, ExternalLink, Zap } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";

export interface ProjectMetric {
  value: number;
  suffix: string;
  label: string;
}

export interface ProjectData {
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  isLive: boolean;
  color: string;
  image: string;
  problem: string;
  approach: string;
  technology: string[];
  results: string;
  metrics: ProjectMetric[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

interface ProjectCardProps {
  project: ProjectData;
  layout?: "left" | "right";
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const isTouch = useIsTouchDevice();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* Header Row — Editorial Style */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6 px-1 sm:px-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-zinc-400 font-mono text-xs sm:text-sm">{project.index}</span>
          <span className="text-zinc-400 text-xs sm:text-sm">—</span>
          <span className="text-zinc-400 text-[10px] sm:text-xs font-medium uppercase tracking-widest">
            {project.category}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {project.isLive && (
            <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-emerald-400 font-medium">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-emerald-400"></span>
              </span>
              Live
            </span>
          )}
          <span className="text-zinc-400 text-xs sm:text-sm font-mono">{project.year}</span>
        </div>
      </div>

      {/* Main Image Container with Parallax */}
      <div
        className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpanded(!expanded)}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden"
          style={{
            rotateY: isTouch ? 0 : mousePos.x * 4,
            rotateX: isTouch ? 0 : -mousePos.y * 4,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          {/* Gradient overlay band */}
          <div
            className="absolute inset-0 z-[1] opacity-60"
            style={{
              background: `linear-gradient(135deg, ${project.color}22 0%, transparent 50%, ${project.color}11 100%)`
            }}
          />

          {/* Image with parallax shift */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            style={{
              x: isTouch ? 0 : mousePos.x * -20,
              y: isTouch ? 0 : mousePos.y * -20,
              scale: 1.08,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-[2]" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-transparent z-[2]" />

          {/* Content overlay */}
          <div className="absolute inset-0 z-[3] flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4 md:gap-6">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight mb-1 sm:mb-2 leading-[1.1]">
                  {project.title}
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base md:text-lg font-light leading-snug">
                  {project.subtitle}
                </p>
              </div>

              {/* Hover CTA - hidden on touch, always shown on mobile bottom */}
              <div className="hidden md:flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-white text-sm font-medium whitespace-nowrap">
                  {expanded ? "Close Study" : "View Case Study"}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tap-to-expand hint on mobile */}
      <div className="md:hidden flex justify-center mt-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-300 transition-colors flex items-center gap-1.5"
        >
          <span>{expanded ? "Tap to close" : "Tap to view case study"}</span>
          <ChevronDown size={12} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Expandable Case Study Detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-8 sm:pt-10 pb-4">
              {/* Metrics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  >
                    <AnimatedCounter
                      target={metric.value}
                      suffix={metric.suffix}
                      label={metric.label}
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white"
                      duration={1.5}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Case Study Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 sm:mb-12">
                {/* Problem & Approach */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: project.color }} />
                      <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-widest">
                        The Challenge
                      </h4>
                    </div>
                    <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: project.color }} />
                      <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-widest">
                        Our Approach
                      </h4>
                    </div>
                    <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                      {project.approach}
                    </p>
                  </div>
                </motion.div>

                {/* Technology & Results */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: project.color }} />
                      <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-widest">
                        Stack
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technology.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:text-white transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={12} className="text-emerald-400 sm:w-[14px] sm:h-[14px]" />
                      <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-widest">
                        Impact
                      </h4>
                    </div>
                    <p className="text-emerald-400 font-medium leading-relaxed text-sm sm:text-base">
                      {project.results}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Testimonial (if present) */}
              {project.testimonial && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-zinc-800/50 bg-zinc-900/30 relative"
                >
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-4xl sm:text-5xl text-zinc-800 font-serif leading-none">"</div>
                  <blockquote className="text-zinc-300 text-base sm:text-lg md:text-xl leading-relaxed italic pl-6 sm:pl-8 pt-2 sm:pt-4 max-w-3xl">
                    {project.testimonial.quote}
                  </blockquote>
                  <div className="mt-5 sm:mt-6 pl-6 sm:pl-8 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.testimonial.author[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium text-xs sm:text-sm truncate">
                        {project.testimonial.author}
                      </p>
                      <p className="text-zinc-400 text-[10px] sm:text-xs truncate">
                        {project.testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Visit Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 sm:mt-8 flex justify-end"
              >
                <a
                  href="mailto:thewebpagebuilder@gmail.com?subject=Project%20Inquiry%3A%20{project.title}"
                  className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors group/link"
                >
                  <span>Discuss this project</span>
                  <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand Indicator - desktop only */}
      <div className="hidden md:flex justify-center mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300 transition-colors text-[10px] sm:text-xs font-medium uppercase tracking-widest"
        >
          <span>{expanded ? "Collapse" : "Explore"}</span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={14} />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}
