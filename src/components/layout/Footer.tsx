"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const TwitterIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const LinkedinIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const GithubIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const InstagramIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const SOCIAL_LINKS = [
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: GithubIcon, href: "#", label: "GitHub" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
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
