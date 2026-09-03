"use client";
import { motion } from "framer-motion";
import { ProjectCard, ProjectData } from "../ui/ProjectCard";
import { TextReveal } from "../ui/TextReveal";

const PROJECTS: ProjectData[] = [
  {
    index: "01",
    title: "Lumina",
    subtitle: "High-conversion headless e-commerce for a luxury fashion brand.",
    category: "E-Commerce",
    year: "2024",
    isLive: true,
    color: "#d4a82d", // Warm Gold
    image: "/lumina.png",
    problem: "Lumina's legacy Shopify theme was bloated, resulting in 4s+ load times and a 65% cart abandonment rate on mobile. They needed a lightning-fast, bespoke experience that reflected their premium brand identity.",
    approach: "We architected a headless Shopify solution using Next.js 14 App Router and framer-motion. We decoupled the frontend to achieve instant page transitions, implemented a custom edge-cached cart, and redesigned the entire UI with a focus on editorial-style product storytelling.",
    technology: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Framer Motion", "Redis"],
    results: "Load times decreased by 78%. Mobile conversion rate increased by 42%. The new platform handled a 300% traffic spike during Black Friday with zero degradation in performance.",
    metrics: [
      { value: 78, suffix: "%", label: "Faster Load Times" },
      { value: 42, suffix: "%", label: "Conversion Lift" },
      { value: 2.1, suffix: "M", label: "Revenue (30d)" },
      { value: 100, suffix: "", label: "Lighthouse Score" },
    ],
    testimonial: {
      quote: "The team didn't just build a faster website; they built a revenue engine. The editorial feel perfectly matches our brand, and the speed is simply incredible.",
      author: "Alexandra Chen",
      role: "E-Commerce Director, Lumina"
    }
  },
  {
    index: "02",
    title: "Nexus Analytics",
    subtitle: "Real-time B2B data visualization dashboard processing millions of rows.",
    category: "SaaS Dashboard",
    year: "2023",
    isLive: true,
    color: "#2dd4a8", // Emerald Teal
    image: "/nexus.png",
    problem: "Nexus's enterprise clients were experiencing massive lag when trying to visualize complex datasets. Their React SPA was freezing the browser thread when rendering charts with more than 50,000 data points.",
    approach: "We rebuilt the entire visualization layer using WebGL via Three.js and custom shaders, offloading the heavy lifting to the GPU. We also implemented a Web Worker architecture for data processing, ensuring the main UI thread remained buttery smooth at 60fps.",
    technology: ["React", "Three.js", "WebGL", "Web Workers", "WebSockets"],
    results: "The new dashboard smoothly renders up to 2 million data points simultaneously without dropping below 60fps. User session length increased by 140% due to the drastically improved UX.",
    metrics: [
      { value: 60, suffix: "fps", label: "Consistent Framerate" },
      { value: 2, suffix: "M+", label: "Data Points Rendered" },
      { value: 140, suffix: "%", label: "Session Duration Lift" },
      { value: 0, suffix: "ms", label: "UI Thread Blocking" },
    ]
  },
  {
    index: "03",
    title: "Studio Alpha",
    subtitle: "Award-winning interactive portfolio for a global creative agency.",
    category: "Web Experience",
    year: "2024",
    isLive: true,
    color: "#6b8cce", // Cool Blue
    image: "/studio_alpha.png",
    problem: "Studio Alpha needed a digital presence that matched their reputation as a top-tier creative agency. Their old site was static and failed to capture the dynamic, avant-garde nature of their work.",
    approach: "We went all-in on WebGL and custom GLSL shaders to create a fluid, highly interactive experience. We built a custom WebGL cursor, fluid distortion effects on images, and seamless page transitions that make the site feel like a native app.",
    technology: ["Next.js", "Three.js", "GLSL Shaders", "GSAP", "Lenis Scroll"],
    results: "The site won Site of the Day on Awwwards and FWA. It resulted in a 300% increase in inbound leads from Fortune 500 companies within the first quarter of launch.",
    metrics: [
      { value: 2, suffix: "", label: "Major Design Awards" },
      { value: 300, suffix: "%", label: "Inbound Lead Lift" },
      { value: 45, suffix: "s", label: "Avg. Engagement Time" },
      { value: 100, suffix: "%", label: "Custom Shaders" },
    ],
    testimonial: {
      quote: "They translated our crazy, abstract ideas into a flawless digital reality. It's the first time our website actually feels like our work.",
      author: "Jordan Lee",
      role: "Founder, Studio Alpha"
    }
  },
  {
    index: "04",
    title: "Horizon",
    subtitle: "Secure, real-time cryptocurrency trading platform and wallet.",
    category: "Fintech App",
    year: "2023",
    isLive: false,
    color: "#e84a5f", // Muted Rose
    image: "/horizon.png",
    problem: "Horizon needed to launch a retail crypto trading app that felt as fast and responsive as Robinhood, but required military-grade security and the ability to process thousands of transactions per second.",
    approach: "We built a robust backend using Rust for core trading logic and Go for high-concurrency API gateways. The frontend was built with React Native for a unified iOS/Android codebase, utilizing Reanimated for 120fps native animations.",
    technology: ["React Native", "Rust", "Go", "PostgreSQL", "Kafka"],
    results: "Successfully processed $500M+ in trading volume in the first 6 months with zero security incidents. The app maintains a 4.9 star rating on the App Store with over 100,000 active users.",
    metrics: [
      { value: 500, suffix: "M+", label: "Trading Volume" },
      { value: 100, suffix: "K+", label: "Active Users" },
      { value: 0, suffix: "", label: "Security Breaches" },
      { value: 4.9, suffix: "★", label: "App Store Rating" },
    ]
  }
];

export function FeaturedWork() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background border-t border-border relative z-10" id="work">
      <div className="container px-5 sm:px-6 mx-auto">
        <div className="mb-16 sm:mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground font-mono text-xs sm:text-sm block mb-3 sm:mb-4"
          >
            / 02 — Selected Works
          </motion.span>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-foreground leading-[1.05] max-w-2xl">
              Work that speaks for itself.
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-sm sm:text-base font-light max-w-xs leading-relaxed"
            >
              A curated selection of our recent projects across e-commerce, SaaS, and creative tech.
            </motion.p>
          </div>
        </div>

        <div className="space-y-16 sm:space-y-24 md:space-y-32 lg:space-y-40">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.index}
              project={project}
              layout={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
