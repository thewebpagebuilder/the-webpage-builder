"use client";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const TwitterIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const LinkedinIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const WhatsappIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.06-.3-.15-1.265-.46-2.411-1.485-.893-.798-1.497-1.782-1.672-2.083-.173-.301-.018-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.202.049-.379-.025-.529-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.273-.225-.573-.375zM12.015 20.5H12a8.5 8.5 0 1 1 8.5-8.5c0 4.7-3.8 8.5-8.485 8.5zM12 2C6.48 2 2 6.48 2 12c0 2.19.71 4.23 1.9 5.86L2.6 22l4.28-1.16C8.42 21.57 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
);

const InstagramIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const SOCIAL_LINKS = [
  { icon: TwitterIcon, href: "https://twitter.com/thewebpagebuilder", label: "Twitter" },
  { icon: LinkedinIcon, href: "https://linkedin.com/company/thewebpagebuilder", label: "LinkedIn" },
  { icon: WhatsappIcon, href: "https://wa.me/919173251344", label: "WhatsApp" },
  { icon: InstagramIcon, href: "https://instagram.com/thewebpagebuilder", label: "Instagram" },
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
              <li>
                <a href="tel:+919173251344" className="hover:text-primary transition-colors block break-all">
                  +91 9173251344
                </a>
              </li>
              <li>Nashik, Maharashtra, India</li>
              <li>Silvassa, Dadra and Nagar Haveli, India</li>
              <li>Available for global projects</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} The Webpage Builder. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
