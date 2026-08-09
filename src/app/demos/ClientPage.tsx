"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { PageHeader } from "@/components/ui/PageHeader";


const DEMOS = [
  {
    id: "luxury-3d",
    title: "Luxury 3D Fashion",
    description: "A Next.js e-commerce storefront with immersive 3D interactions.",
    url: "/demo/luxury-3d-fashion-website",
    tags: ["Next.js", "Three.js", "Tailwind CSS"]
  },
  {
    id: "silvassa",
    title: "Silvassa Resources Redesign",
    description: "Corporate website redesign for a resource management firm.",
    url: "/demo/silvassa-resources-website-redesign",
    tags: ["React", "Vite", "Framer Motion"]
  },
  {
    id: "dr-agrawal",
    title: "Dr. Agrawal Website Redesign",
    description: "Medical professional portfolio and clinic website.",
    url: "/demo/website-redesign-and-optimization dr Agrawal",
    tags: ["React", "Vite", "Tailwind CSS"]
  }
];

export default function ClientPage() {
  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-32">
      
      <div className="container px-5 sm:px-6 mx-auto">
        <PageHeader 
          title="Demo Projects" 
          subtitle="Explore our standalone demonstration projects and sample websites built with various modern frameworks."
        />

        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DEMOS.map((demo, idx) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="mb-6 flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {demo.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-[10px] sm:text-xs text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{demo.title}</h3>
                <p className="text-zinc-400 text-sm">{demo.description}</p>
              </div>

              <a
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-between text-sm font-medium text-zinc-300 group-hover:text-white transition-colors"
              >
                <span>View Demo</span>
                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ExternalLink size={14} />
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
