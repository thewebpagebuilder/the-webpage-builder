import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      {/* Top CTA strip */}
      <div className="border-b border-zinc-900">
        <div className="container px-5 sm:px-6 mx-auto py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              Still thinking about it?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Your competitors are already building. Let's talk.
            </p>
          </div>
          <Link
            to="/contact"
            className="h-10 sm:h-11 px-6 sm:px-8 rounded-full bg-white text-black text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          >
            Book a Call
            <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px]" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container px-5 sm:px-6 mx-auto py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-12 sm:mb-16">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <img src="/logo.webp" alt="Logo" className="w-6 h-6 object-contain" />
              <h3 className="text-lg sm:text-xl font-bold tracking-tighter text-white">
                The Webpage Builder<span className="text-zinc-400">.</span>
              </h3>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed mb-5 sm:mb-6">
              Building digital solutions that scale. From AI-powered websites to custom software, mobile apps, and UI/UX design. We build the technology that grows your business.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <Link
                to="/contact"
                className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-white"
              >
                Book a Free Call
              </Link>
              <span className="text-zinc-800">·</span>
              <a
                href="mailto:thewebpagebuilder@gmail.com?subject=Project%20Inquiry"
                className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-white"
              >
                Email Us
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-zinc-300 font-semibold text-xs sm:text-sm mb-4 sm:mb-5 uppercase tracking-wider">
              Navigate
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li><Link to="/portfolio" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Portfolio</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Services</Link></li>
              <li><Link to="/about" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">About</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-300 font-semibold text-xs sm:text-sm mb-4 sm:mb-5 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li><Link to="/services" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Web Development</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Mobile Apps</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">Custom Software</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">UI/UX Design</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">AI Solutions</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">SEO & Growth</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-zinc-900 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 text-center md:text-left">
            <p className="text-zinc-650 text-[10px] sm:text-xs">
              © {currentYear} The Webpage Builder. All rights reserved. Made with precision in India.
            </p>
            <span className="text-zinc-800 text-xs hidden md:inline">·</span>
            <div className="flex items-center gap-3">
              <Link to="/privacy" className="text-zinc-400 hover:text-white transition-colors text-[10px] sm:text-xs">Privacy</Link>
              <span className="text-zinc-800 text-xs">·</span>
              <Link to="/terms" className="text-zinc-400 hover:text-white transition-colors text-[10px] sm:text-xs">Terms</Link>
              <span className="text-zinc-800 text-xs">·</span>
              <a href="mailto:thewebpagebuilder@gmail.com?subject=Bug%20Report&body=Describe%20the%20bug%20and%20steps%2520to%2520reproduce%3A" className="text-zinc-400 hover:text-white transition-colors text-[10px] sm:text-xs">Report a Bug</a>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-5">
            <a href="mailto:thewebpagebuilder@gmail.com" className="text-zinc-400 hover:text-zinc-350 transition-colors text-[10px] sm:text-xs">Gmail</a>
            <a href="https://www.instagram.com/thewebpagebuilder/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-350 transition-colors text-[10px] sm:text-xs">Instagram</a>
            <a href="https://wa.me/919173251344" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-350 transition-colors text-[10px] sm:text-xs">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
