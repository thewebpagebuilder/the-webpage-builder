import { motion } from "framer-motion";
import { Contact } from "../components/sections/Contact";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const POSTS = [
  {
    slug: "modern-web-architecture-2025",
    title: "Modern Web Architecture in 2025: What Actually Matters",
    excerpt: "Beyond the hype: A practical guide to choosing the right stack for scale, performance, and developer experience.",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Engineering",
    featured: true,
  },
  {
    slug: "ai-powered-ux-patterns",
    title: "AI-Powered UX Patterns That Don't Feel Like Magic",
    excerpt: "How to integrate LLMs into your product without the uncanny valley. Real examples from production.",
    date: "2025-01-08",
    readTime: "6 min read",
    category: "Design",
    featured: true,
  },
  {
    slug: "headless-commerce-guide",
    title: "Headless Commerce: The Complete Technical Guide",
    excerpt: "From Shopify Hydrogen to custom backends — when headless makes sense and when it doesn't.",
    date: "2024-12-20",
    readTime: "12 min read",
    category: "E-Commerce",
    featured: false,
  },
  {
    slug: "threejs-performance",
    title: "Three.js Performance: 60fps on Mobile Without Compromise",
    excerpt: "Techniques we've used to ship WebGL experiences that don't drain batteries or melt phones.",
    date: "2024-12-12",
    readTime: "10 min read",
    category: "3D/WebGL",
    featured: false,
  },
  {
    slug: "design-systems-scale",
    title: "Design Systems That Scale (And Don't Die in 6 Months)",
    excerpt: "Why most design systems fail, and how to build one that engineers actually want to use.",
    date: "2024-11-28",
    readTime: "9 min read",
    category: "Design",
    featured: false,
  },
  {
    slug: "seo-technical-guide",
    title: "Technical SEO for React Apps: Beyond the Basics",
    excerpt: "Core Web Vitals, structured data, and the edge cases nobody talks about.",
    date: "2024-11-15",
    readTime: "7 min read",
    category: "SEO",
    featured: false,
  },
];

export function BlogPage() {
  const featured = POSTS.filter(p => p.featured);
  const regular = POSTS.filter(p => !p.featured);

  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
        <div className="container px-5 sm:px-6 mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-4">/ Blog</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
              Engineering insights,<br className="hidden sm:block" /> no fluff.
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-2xl leading-relaxed">
              Real lessons from building production software. No listicles. No AI-generated filler.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 sm:py-20 md:py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container px-5 sm:px-6 mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 sm:mb-12">Featured</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {featured.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {post.category}
                    </span>
                    <span className="text-zinc-400 text-xs">•</span>
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-zinc-300 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                      <Clock size={12} />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 group-hover:text-white transition-colors text-sm font-medium">
                      Read article
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 sm:py-20 md:py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container px-5 sm:px-6 mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 sm:mb-12">All Articles</h2>
          <div className="space-y-0 divide-y divide-zinc-800/50">
            {regular.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="py-6 sm:py-8 group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                      <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {post.category}
                      </span>
                      <span className="text-zinc-700 text-xs">•</span>
                      <span className="text-zinc-400 text-xs">
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-zinc-300 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 group-hover:text-zinc-400 transition-colors text-xs font-medium flex-shrink-0">
                    {post.readTime}
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
