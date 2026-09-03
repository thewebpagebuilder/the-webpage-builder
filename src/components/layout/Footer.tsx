"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const SOCIAL_LINKS = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-border pt-16 sm:pt-20 md:pt-32 pb-8 sm:pb-10 relative overflow-hidden">
      {/* Decorative text */}
      <div className="absolute top-10 left-0 right-0 overflow-hidden flex justify-center opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[15vw] font-bold leading-none tracking-tighter whitespace-nowrap text-foreground">
          DIGITAL FUTURES
        </h2>
      </div>

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 sm:mb-20 md:mb-32">
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground mb-4 sm:mb-6 block"
            >
              The Webpage Builder<span className="text-primary">.</span>
            </Link>
            <p className="text-muted-foreground text-sm sm:text-base font-light max-w-sm mb-6 sm:mb-8 leading-relaxed">
              We engineer premium digital experiences for forward-thinking brands and ambitious startups worldwide.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {SOCIAL_LINKS.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-foreground font-semibold text-sm mb-4 sm:mb-6 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3 sm:space-y-4">
              {["Work", "Services", "Process", "Pricing"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {item}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-foreground font-semibold text-sm mb-4 sm:mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 sm:space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-2 md:col-span-2">
            <h4 className="text-foreground font-semibold text-sm mb-4 sm:mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="mailto:thewebpagebuilder@gmail.com" className="hover:text-primary transition-colors block break-all">
                  thewebpagebuilder@gmail.com
                </a>
              </li>
              <li>New Delhi, India</li>
              <li>Available for global projects</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} The Webpage Builder. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-medium">
            <span>Designed in</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Figma</span>
            <span className="mx-2">·</span>
            <span>Built with</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
