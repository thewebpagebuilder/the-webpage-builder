import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard, type ProjectData } from "../ui/ProjectCard";
import { ArrowUpRight } from "lucide-react";
import { LeadFormModal } from "../ui/Modal";

const PROJECTS: ProjectData[] = [
  {
    index: "01",
    title: "Lumina Store",
    subtitle: "A premium e-commerce platform redefining online shopping",
    category: "E-Commerce",
    year: "2026",
    isLive: true,
    color: "#f59e0b",
    image: "/lumina.webp",
    problem: "Premium fashion retailer needed a flagship online presence that matched the in-store luxury experience. Previous attempt resulted in poor performance and checkout abandonment.",
    approach: "Engineered a headless commerce architecture with Next.js + Shopify Hydrogen, optimizing for Core Web Vitals and edge delivery worldwide. Created a custom design system with GSAP-driven micro-interactions.",
    technology: ["Next.js", "Shopify Hydrogen", "Tailwind CSS", "GSAP", "Sanity CMS", "Vercel Edge", "Algolia"],
    results: "Achieved sub-second load times globally. Checkout completion rose 62%. The fastest premium fashion storefront in its category.",
    metrics: [
      { value: 62, suffix: "%", label: "Checkout ↑" },
      { value: 4, suffix: ".2x", label: "Page Speed" },
      { value: 3, suffix: "x", label: "Conversion ↑" },
      { value: 12, suffix: "M", label: "Monthly Visits" },
    ],
    testimonial: {
      quote: "Lumina Store feels like a Milan boutique — but online. Our customers have genuinely never experienced anything this fast and beautifully designed.",
      author: "Priya Menon",
      role: "Head of Digital, Lumina"
    }
  },
  {
    index: "02",
    title: "Nexus Analytics",
    subtitle: "Enterprise-grade SaaS dashboard for real-time business intelligence",
    category: "SaaS Dashboard",
    year: "2025",
    isLive: true,
    color: "#8b5cf6",
    image: "/nexus.webp",
    problem: "Enterprise teams working across 14 data tools, spending days compiling manual reports. Decision-makers didn't have real-time visibility into critical metrics.",
    approach: "Built a unified analytics platform with custom ETL connectors, real-time streaming data pipelines, and an AI-powered insights engine that proactively surfaces anomalies using fine-tuned LLMs.",
    technology: ["React", "TypeScript", "Go", "ClickHouse", "Kafka", "D3.js", "Three.js", "OpenAI"],
    results: "Reporting time reduced from 3 days to real-time. 200+ enterprise teams adopted Nexus in the first 6 months. $8M ARR achieved within Year 1.",
    metrics: [
      { value: 200, suffix: "+", label: "Enterprise" },
      { value: 8, suffix: "M", label: "ARR Year 1" },
      { value: 99, suffix: ".9%", label: "SLA Uptime" },
      { value: 3, suffix: "B+", label: "Events/Day" },
    ],
    testimonial: {
      quote: "Nexus replaced our entire reporting workflow. What took 72 hours, now takes 7.2 seconds. The ROI was immediate.",
      author: "Carlos Vega",
      role: "COO, GlobalTranz"
    }
  },
  {
    index: "03",
    title: "Studio Alpha",
    subtitle: "Award-winning creative agency platform — reimagined from the ground up",
    category: "Creative Agency",
    year: "2025",
    isLive: true,
    color: "#06b6d4",
    image: "/studio_alpha.webp",
    problem: "Studio Alpha had an outdated portfolio website that didn't reflect their Awwwards-quality work. Prospects were bouncing within 6 seconds on mobile.",
    approach: "Engineered a WebGL + GSAP-powered immersive website featuring a custom 3D cursor, scroll-driven storybook navigation, and a CMS-driven project showcase. Optimized for 60fps even on mid-tier mobile devices.",
    technology: ["Next.js", "Three.js", "GSAP", "Lenis", "Framer Motion", "Sanity", "Vercel"],
    results: "Avg. time-on-site up 4.7x. Won Awwwards 'Site of the Day'. 3x higher inbound inquiry conversion.",
    metrics: [
      { value: 4, suffix: ".7x", label: "Time on Site ↑" },
      { value: 3, suffix: "x", label: "Leads ↑" },
      { value: 60, suffix: "fps", label: "Target" },
      { value: 12, suffix: "", label: "Awwwards" },
    ],
    testimonial: {
      quote: "Our new website finally looks and feels like our work. Clients land on the homepage and say, 'wow'. That's priceless.",
      author: "Jordan Lee",
      role: "Founder, Studio Alpha"
    }
  },
  {
    index: "04",
    title: "Horizon Finance",
    subtitle: "Next-generation banking platform — speed, security, and beautiful design",
    category: "Fintech Application",
    year: "2024",
    isLive: true,
    color: "#6366f1",
    image: "/horizon.webp",
    problem: "Legacy banking infrastructure suffered from 8-second transaction latency and a 67% drop-off during mobile onboarding. Horizon was bleeding market share to neo-banks.",
    approach: "Architected a microservices platform with event-driven processing, real-time WebSocket data feeds, and a cross-platform PWA. Biometric auth replaced traditional KYC. All with bank-grade security.",
    technology: ["React Native", "Node.js", "PostgreSQL", "Redis", "Stripe Connect", "WebSockets", "Kubernetes"],
    results: "300% faster transactions. Onboarding completion rose from 33% to 91%. Mobile engagement up 4.2x.",
    metrics: [
      { value: 300, suffix: "%", label: "Speed ↑" },
      { value: 91, suffix: "%", label: "Onboarding" },
      { value: 4, suffix: ".2x", label: "Engagement ↑" },
      { value: 2, suffix: "M+", label: "Users" },
    ],
    testimonial: {
      quote: "The Webpage Builder didn't just rebuild our bank — they reimagined it. Our engineers call this the 'Horizon 2.0 leap'.",
      author: "Sarah Jenkins",
      role: "CTO, Horizon Finance"
    }
  },
  {
    index: "05",
    title: "Aura Branding",
    subtitle: "Brand identity transformation and flagship web experience",
    category: "Brand Identity & Web",
    year: "2024",
    isLive: true,
    color: "#ec4899",
    image: "/aura.webp",
    problem: "Aura was a 20-year-old brand struggling to stay relevant with Gen-Z and Millennial audiences. Their identity and website felt dated and slow.",
    approach: "Led a full rebrand including typography, color, and identity design, then engineered an award-winning website with a modular CMS. Included motion design, scroll storytelling, and an AI-powered product finder.",
    technology: ["React", "Next.js", "GSAP", "Lenis", "Sanity CMS", "Shopify", "OpenAI"],
    results: "Brand recall up 48% among target audience. Average session duration tripled. New customer acquisition cost down by 37%.",
    metrics: [
      { value: 48, suffix: "%", label: "Brand Recall ↑" },
      { value: 3, suffix: "x", label: "Session Duration ↑" },
      { value: 37, suffix: "%", label: "CAC ↓" },
      { value: 94, suffix: "/100", label: "Lighthouse" },
    ],
    testimonial: {
      quote: "We're a 20-year-old company and we feel like a startup again. The rebrand and the website completely changed how we're perceived.",
      author: "Ananya Sharma",
      role: "CMO, Aura"
    }
  },
  {
    index: "06",
    title: "Elevate Workspace",
    subtitle: "Corporate collaboration platform reimagined for the hybrid workforce",
    category: "Corporate Platform",
    year: "2023",
    isLive: true,
    color: "#22c55e",
    image: "/elevate.webp",
    problem: "Large enterprise workforce working across 37 countries and 7 time zones using a patchwork of tools for meetings, docs, and project tracking. Productivity was plummeting.",
    approach: "Designed and engineered a unified collaboration hub: calendar-first architecture, AI-powered meeting summaries, unified document editor, and cross-device sync. All SSO-integrated with existing enterprise auth.",
    technology: ["React", "TypeScript", "Rust", "WebAssembly", "Yjs", "AWS Lambda", "OpenAI"],
    results: "Tool consolidation from 14 → 3 primary platforms. Meeting time reduced by 28%. Enterprise-wide rollout completed in 6 months.",
    metrics: [
      { value: 14, suffix: " → 3", label: "Tool Consolidation" },
      { value: 28, suffix: "%", label: "Meetings ↓" },
      { value: 12, suffix: "K", label: "Employees" },
      { value: 6, suffix: "mo", label: "Rollout Speed" },
    ],
    testimonial: {
      quote: "I was skeptical of a 'one platform' approach, but Elevate delivered. Our productivity metrics have never looked better.",
      author: "Dr. Helena Park",
      role: "VP Engineering, Elevate Corp."
    }
  },
  {
    index: "07",
    title: "Quantum Core",
    subtitle: "Enterprise cybersecurity platform — threat detection at machine scale",
    category: "Cybersecurity Platform",
    year: "2023",
    isLive: true,
    color: "#f97316",
    image: "/quantum.webp",
    problem: "SOC alerts overwhelmed analysts. 40,000+ security alerts per day — mostly false positives. Critical threats slipping through the noise while teams experienced analyst burnout.",
    approach: "Built a threat-intelligence platform combining anomaly detection ML models, graph analytics for attack-path visualization, and a LLM incident helper. Designed a triage-first UI that surfaces genuine threats in seconds.",
    technology: ["Python", "Go", "React", "TypeScript", "Neo4j", "TensorFlow", "Elasticsearch", "AWS"],
    results: "False-positive reduction from 92% → 18%. Average detection time from hours to 11 seconds. SOC team capacity increased by 4x.",
    metrics: [
      { value: 18, suffix: "%", label: "False Positives" },
      { value: 11, suffix: "s", label: "Detection Speed" },
      { value: 4, suffix: "x", label: "SOC Capacity ↑" },
      { value: 40, suffix: "K→3K", label: "Alerts/Day" },
    ],
    testimonial: {
      quote: "Our CISO now sleeps through the night. Quantum Core transformed our threat posture overnight. It's a force multiplier.",
      author: "Richard Okafor",
      role: "Director of Security, Quantum Corp."
    }
  },
  {
    index: "08",
    title: "Flow CRM",
    subtitle: "A CRM that customers actually enjoy using — built for modern sales teams",
    category: "Web Application",
    year: "2022",
    isLive: true,
    color: "#eab308",
    image: "/flow.webp",
    problem: "Traditional CRMs felt like tax software. Sales teams hated logging in, avoided data entry, and leadership had incomplete visibility into the pipeline. Forecasts were consistently wrong.",
    approach: "Engineered Flow CRM with a consumer-grade UI, keyboard-first navigation, and AI-assisted data entry. Designed a real-time forecasting engine that analyzes every interaction, not just manually-entered data. Built for sales reps first.",
    technology: ["Next.js", "TypeScript", "PostgreSQL", "GraphQL", "OpenAI", "Stripe", "Redis"],
    results: "Team adoption from 40% → 97%. Sales forecast accuracy from 58% → 89%. Companies churned competitors to move to Flow.",
    metrics: [
      { value: 97, suffix: "%", label: "Team Adoption" },
      { value: 89, suffix: "%", label: "Forecast Accuracy" },
      { value: 18, suffix: "%", label: "Win Rate ↑" },
      { value: 3, suffix: "x", label: "Pipeline Visibility" },
    ],
    testimonial: {
      quote: "Sales reps actually volunteer to use Flow. That's something we'd never heard of before. The pipeline finally makes sense to leadership.",
      author: "Kate Whitmore",
      role: "VP Sales, Flow"
    }
  },
  {
    index: "09",
    title: "Vanguard App",
    subtitle: "Native mobile app experience — built for iOS and Android, with a bespoke UI",
    category: "Mobile Native App",
    year: "2022",
    isLive: true,
    color: "#a855f7",
    image: "/vanguard.webp",
    problem: "Existing mobile app had poor App Store ratings (2.8 stars), slow performance, and a UI that didn't match the web platform's award-winning design. Users uninstalled quickly after first-use friction.",
    approach: "Rebuilt natively — Swift for iOS, Kotlin for Android — with a cross-platform shared business logic layer (Rust). Designed a bespoke animation system with choreographed micro-interactions mirroring the web experience.",
    technology: ["Swift", "Kotlin", "Rust", "React Native (shared)", "Firebase", "App Store Connect", "Google Play"],
    results: "App Store rating jumped to 4.8 stars (best-in-class). Retention after Day 30 rose from 14% to 62%. Listed in Apple's 'Apps We Love' collection.",
    metrics: [
      { value: 4, suffix: ".8★", label: "App Rating" },
      { value: 62, suffix: "%", label: "D30 Retention" },
      { value: 14, suffix: "%→62%", label: "Retention Jump" },
      { value: 500, suffix: "K+", label: "Installs" },
    ],
    testimonial: {
      quote: "From 2.8 to 4.8 stars in 6 months. Users now actively recommend our app to friends. That's the best marketing we could ask for.",
      author: "Neha Singh",
      role: "Head of Mobile, Vanguard"
    }
  }
];

const CATEGORIES = [
  "All",
  "E-Commerce",
  "SaaS Dashboard",
  "Creative Agency",
  "Fintech Application",
  "Brand Identity & Web",
  "Corporate Platform",
  "Cybersecurity Platform",
  "Web Application",
  "Mobile Native App"
];

export function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-zinc-950 relative z-10" id="work">
      <div className="container px-5 sm:px-6 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-zinc-400 font-mono text-xs sm:text-sm block mb-3 sm:mb-4"
              >
                / Our Professionality In — 03
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-white leading-[1.05]">
                Selected<br className="hidden sm:block" /> Portfolio
              </h2>
            </div>
            <p className="text-zinc-400 text-base sm:text-lg max-w-md font-light leading-relaxed">
              Five years, nine signature projects. Each one a partnership in engineering digital excellence.
            </p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20 -mx-5 sm:mx-0 px-5 sm:px-0 overflow-x-auto no-scrollbar"
        >
          <div className="flex items-center gap-2 pb-2 min-w-max pr-5 flex-wrap sm:flex-nowrap">
            {CATEGORIES.map((category) => {
              const count = category === "All"
                ? PROJECTS.length
                : PROJECTS.filter(p => p.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-white text-black"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  {category}
                  <span className={`ml-2 ${activeCategory === category ? "opacity-60" : "text-zinc-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Minimal Editorial Project List — like a premium agency index */}
        <div className="mb-16 sm:mb-20">
          {/* List header */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-zinc-800/50 mb-2 text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
            <div className="col-span-1">No.</div>
            <div className="col-span-5">Project</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Year</div>
          </div>

          {/* Project rows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, i) => (
                <motion.a
                  key={project.index}
                  href={`#project-${project.index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(`project-${project.index}`);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="group block border-b border-zinc-800/40 hover:border-zinc-700 transition-colors"
                >
                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center py-6 lg:py-7 cursor-pointer">
                    <div className="col-span-1 text-zinc-400 font-mono text-sm group-hover:text-zinc-300 transition-colors">
                      {project.index}
                    </div>
                    <div className="col-span-5">
                      <h3 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight group-hover:text-zinc-300 transition-colors flex items-center gap-3">
                        {project.title}
                        <ArrowUpRight
                          size={20}
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-400"
                        />
                      </h3>
                    </div>
                    <div className="col-span-3 text-zinc-400 text-sm">
                      {project.category}
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-xs">
                      {project.isLive ? (
                        <>
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-full w-full bg-emerald-400"></span>
                          </span>
                          <span className="text-emerald-400 font-medium">Live</span>
                        </>
                      ) : (
                        <span className="text-zinc-400">Archived</span>
                      )}
                    </div>
                    <div className="col-span-1 text-right text-zinc-400 text-sm font-mono">
                      {project.year}
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden py-5 cursor-pointer">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-zinc-300 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-zinc-400 text-xs font-mono flex-shrink-0 mt-1.5">
                        {project.year}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-zinc-400 text-xs">
                        {project.category}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        {project.isLive ? (
                          <>
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-full w-full bg-emerald-400"></span>
                            </span>
                            <span className="text-emerald-400 font-medium">Live</span>
                          </>
                        ) : (
                          <span className="text-zinc-400">Archived</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Featured Case Studies — Cinematic detail cards */}
        <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <div key={project.index} id={`project-${project.index}`}>
                <ProjectCard project={project} />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* HIGHLIGHTED Client Privacy & Confidentiality */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 sm:mt-32 md:mt-40 text-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 rounded-2xl sm:rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.02] relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            <p className="text-emerald-400 font-bold text-xs sm:text-sm md:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-5 sm:mb-6">
              ★ CLIENT PRIVACY & CONFIDENTIALITY ★
            </p>
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-medium">
              WE DO NOT SHARE YOUR WORK WITH OTHERS, NOR OTHERS' WORK WITH YOU. YOU CAN SAFELY DESCRIBE YOUR REQUIREMENTS, AND WE WILL BUILD A CUSTOM DEMO PAGE TAILORED EXCLUSIVELY TO YOUR VISION.
            </p>
            <button
              onClick={() => setDemoModalOpen(true)}
              className="h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-emerald-400 text-zinc-950 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-emerald-300 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-3"
            >
              <span>Request a Private Demo</span>
              <span>→</span>
            </button>
          </div>
        </motion.div>
      </div>

      <LeadFormModal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} variant="demo" />
    </section>
  );
}
