"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = usePathname();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: "/portfolio", label: "Work", id: "work" },
    { to: "/services", label: "Services", id: "services" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleSectionClick = (id: string) => (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      setMobileMenuOpen(false);
      setTimeout(() => scrollToSection(id, 80), 50);
    }
    // If not on home, let the Link navigate to the page
  };

  const scrollToTop = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    // If not on home, Link will navigate to "/"
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-zinc-950/90 backdrop-blur-xl border-zinc-800/50 py-3"
            : "bg-transparent border-transparent py-4 sm:py-5",
          !visible && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="container px-5 sm:px-6 mx-auto flex items-center justify-between">
          <Link
            href="/"
            onClick={scrollToTop}
            className="text-base sm:text-lg font-bold tracking-tighter text-white flex items-center gap-2 relative z-10"
          >
            <img src="/logo.webp" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="hidden xs:inline sm:inline">The Webpage Builder</span>
            <span className="xs:hidden sm:hidden">TWB</span>
            <span className="text-zinc-400">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={isHome && link.id ? handleSectionClick(link.id) : undefined}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 relative z-10">
            <Link
              href="/contact"
              className="hidden sm:flex h-10 px-5 md:px-6 rounded-full items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 bg-white text-black hover:bg-zinc-200"
            >
              Book a Call
              <ArrowRight size={14} />
            </Link>
            {/* Mobile CTA - simplified */}
            <Link
              href="/contact"
              className="sm:hidden h-9 px-4 rounded-full bg-white text-black text-xs font-semibold flex items-center gap-1.5 hover:bg-zinc-200 transition-colors"
            >
              Contact
              <ArrowRight size={11} />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="relative pt-24 pb-10 px-6 h-full flex flex-col"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.to}
                      onClick={handleLinkClick}
                      className="text-3xl sm:text-4xl font-bold text-white hover:text-zinc-400 transition-colors py-3 border-b border-zinc-900 block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/contact"
                    onClick={handleLinkClick}
                    className="text-3xl sm:text-4xl font-bold text-zinc-400 hover:text-zinc-400 transition-colors py-3 border-b border-zinc-900 block"
                  >
                    Contact
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-auto space-y-4"
              >
                <Link
                  href="/contact"
                  onClick={handleLinkClick}
                  className="h-14 rounded-full bg-white text-black font-medium flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors text-base"
                >
                  Book a Free Call
                  <ArrowRight size={16} />
                </Link>
                <div className="flex flex-col gap-2 text-sm text-zinc-400">
                  <a href="mailto:thewebpagebuilder@gmail.com" className="hover:text-white transition-colors">
                    thewebpagebuilder@gmail.com
                  </a>
                  <p>24/7 Global Support · 5+ Years</p>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
