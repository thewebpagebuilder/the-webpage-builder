import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";
import { BookOpen, Video, FileText, ChevronRight } from "lucide-react";

const resources = [
  { type: "guide", icon: BookOpen, title: "Complete Guide to Dental Implants", desc: "Everything you need to know about the implant process and recovery.", link: "/resources/dental-implants" },
  { type: "guide", icon: BookOpen, title: "Aligners vs Braces", desc: "Compare treatment options, costs, and timelines.", link: "/resources/aligners-vs-braces" },
  { type: "video", icon: Video, title: "What to Expect During Your First Visit", desc: "Walkthrough of your initial consultation and treatment planning.", link: "/resources/first-visit" },
  { type: "guide", icon: BookOpen, title: "Root Canal Treatment Explained", desc: "Debunking myths about the modern, painless root canal.", link: "/resources/root-canal" },
  { type: "video", icon: Video, title: "Proper Brushing & Flossing Technique", desc: "Learn the correct methods from our dental experts.", link: "/resources/brushing-flossing" },
  { type: "pdf", icon: FileText, title: "Post-Treatment Care Instructions", desc: "Downloadable PDF with care guidelines.", link: "/resources/post-treatment" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Patient Resources" title="Educate Yourself About Dental Care" subtitle="Access guides, videos and resources for informed decisions about your oral health." crumbs={[{ label: "Resources" }]} />
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <motion.a 
                key={index} 
                href={`#${resource.link}`} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.05 }} 
                className="group rounded-2xl border border-slate-200 bg-amber-50 p-6 transition hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white">
                    <resource.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium uppercase text-amber-700">
                    {resource.type}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-black group-hover:text-amber-600">
                  {resource.title}
                </h3>
                <p className="mb-4 text-sm text-slate-600">{resource.desc}</p>
                <span className="inline-flex items-center text-sm font-semibold text-amber-600">
                  Read More <ChevronRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
