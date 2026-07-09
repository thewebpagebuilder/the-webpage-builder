import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Untitled%20(11%20%C3%97%2021cm).png/:/rs=h:142,cg:true,m/qt=q:95"
            alt="Dr. Agrawal's Logo"
            className="h-14 w-auto rounded-lg bg-white object-contain p-1 shadow-sm"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="leading-tight hidden sm:block">
            <span className="block font-display text-lg font-bold tracking-tight text-black">Dr. Agrawal's</span>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-amber-600">Dental Clinic</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-sm font-medium transition hover:text-amber-600 ${isActive ? "text-amber-600" : "text-black"}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+917498444051" className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-50">
            <Phone className="h-4 w-4" /> +91 74984 44051
          </a>
          <Link to="/book" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:from-amber-600 hover:to-yellow-600">
            <Calendar className="h-4 w-4" /> Book Appointment
          </Link>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="rounded-lg p-2 text-black lg:hidden" aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden bg-white shadow-lg lg:hidden">
            <nav className="flex flex-col gap-1 px-4 pb-5 pt-2">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => `rounded-lg px-3 py-3 text-base font-medium hover:bg-amber-50 hover:text-amber-700 ${isActive ? "bg-amber-50 text-amber-700" : "text-black"}`}>{link.label}</NavLink>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
                <a href="tel:+917498444051" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-semibold text-black"><Phone className="h-4 w-4" /> Call Now</a>
                <Link to="/book" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-semibold text-white"><Calendar className="h-4 w-4" /> Book Appointment</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
