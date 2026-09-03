"use client";
import { motion } from "framer-motion";

const TECH_CATEGORIES = [
  {
    title: "Frontend",
    icon: "🎨",
    accent: "hsl(168 76% 42%)",
    technologies: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Three.js / WebGL", level: "Expert" },
      { name: "GSAP", level: "Expert" },
      { name: "Framer Motion", level: "Expert" },
      { name: "Vue.js", level: "Advanced" },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    accent: "hsl(42 85% 55%)",
    technologies: [
      { name: "Node.js", level: "Expert" },
      { name: "Python", level: "Expert" },
      { name: "Go", level: "Advanced" },
      { name: "Rust", level: "Advanced" },
      { name: "GraphQL", level: "Expert" },
      { name: "tRPC", level: "Expert" },
      { name: "PostgreSQL", level: "Expert" },
      { name: "Redis", level: "Expert" },
    ],
  },
  {
    title: "Infrastructure",
    icon: "☁️",
    accent: "hsl(220 70% 55%)",
    technologies: [
      { name: "AWS", level: "Expert" },
      { name: "Vercel", level: "Expert" },
      { name: "Docker", level: "Expert" },
      { name: "Kubernetes", level: "Advanced" },
      { name: "Terraform", level: "Advanced" },
      { name: "Cloudflare", level: "Expert" },
      { name: "GitHub Actions", level: "Expert" },
      { name: "CI/CD Pipelines", level: "Expert" },
    ],
  },
  {
    title: "AI & Data",
    icon: "🧠",
    accent: "hsl(280 60% 55%)",
    technologies: [
      { name: "OpenAI / GPT", level: "Expert" },
      { name: "TensorFlow", level: "Advanced" },
      { name: "PyTorch", level: "Advanced" },
      { name: "Pinecone / Vector DB", level: "Expert" },
      { name: "LangChain", level: "Expert" },
      { name: "Hugging Face", level: "Advanced" },
      { name: "Whisper AI", level: "Advanced" },
      { name: "RAG Systems", level: "Expert" },
    ],
  },
  {
    title: "Mobile",
    icon: "📱",
    accent: "hsl(340 65% 55%)",
    technologies: [
      { name: "React Native", level: "Expert" },
      { name: "Swift (iOS)", level: "Advanced" },
      { name: "Kotlin (Android)", level: "Advanced" },
      { name: "Expo", level: "Expert" },
      { name: "Flutter", level: "Advanced" },
      { name: "App Store Connect", level: "Expert" },
      { name: "Firebase", level: "Expert" },
      { name: "Push Notifications", level: "Expert" },
    ],
  },
];

export function TechStack() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background border-t border-border overflow-hidden">
      <div className="container px-5 sm:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-3 sm:mb-4">/ Our Tech Stack</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-3 sm:mb-4 px-2">
            Modern tools. <span className="text-primary">Proven at scale.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg font-light max-w-xl mx-auto px-2">
            We use the best tools for the job, ensuring your product is scalable, secure, and future-proof.
          </p>
        </motion.div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {TECH_CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/20 transition-all group relative overflow-hidden"
            >
              {/* Accent glow on hover */}
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: `${category.accent}15` }}
              />

              <div className="relative">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-border">
                  <span className="text-lg sm:text-xl">{category.icon}</span>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">{category.title}</h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3">
                  {category.technologies.map((tech) => (
                    <li
                      key={tech.name}
                      className="flex items-center justify-between text-xs sm:text-sm group/item cursor-default gap-2"
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0 transition-colors"
                          style={{ backgroundColor: tech.level === "Expert" ? category.accent : "hsl(var(--border))" }}
                        />
                        <span className="text-muted-foreground group-hover/item:text-foreground transition-colors truncate">
                          {tech.name}
                        </span>
                      </div>
                      <span
                        className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 rounded-full border flex-shrink-0"
                        style={{
                          color: tech.level === "Expert" ? category.accent : "hsl(var(--muted-foreground))",
                          borderColor: tech.level === "Expert" ? `${category.accent}30` : "hsl(var(--border))",
                          backgroundColor: tech.level === "Expert" ? `${category.accent}10` : "transparent",
                        }}
                      >
                        {tech.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
