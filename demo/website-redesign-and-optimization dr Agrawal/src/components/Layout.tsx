import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, MessageCircle, X, ChevronRight, Clock, MapPin, CheckCircle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";

const waNumber = "917498444051";

export default function Layout() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setShowStickyCTA(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowOfferModal(true), 20000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const waMessage = encodeURIComponent(
    "Hi Dr. Agrawal's Dental Clinic, I would like to know more about your services and book a consultation."
  );

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${waNumber}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/30 transition-transform hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Sticky bottom CTA on mobile */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden"
          >
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
              <a href={`tel:+${waNumber}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700">
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a href="#/book" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 text-sm font-semibold text-white shadow">
                <Calendar className="h-4 w-4" /> Book Visit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timed offer modal */}
      <AnimatePresence>
        {showOfferModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            onClick={() => setShowOfferModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-5 text-white">
                <h3 className="text-xl font-bold">Limited Time Offer 🎉</h3>
                <p className="text-sm opacity-90">
                  Get a FREE dental consultation + 20% off your first teeth cleaning.
                </p>
              </div>
              <button
                onClick={() => setShowOfferModal(false)}
                className="absolute right-3 top-3 rounded-full bg-white/20 p-1 text-white hover:bg-white/30"
                aria-label="Close offer"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="space-y-4 p-6">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    Comprehensive oral check-up
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    Personalized treatment plan
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    No hidden charges
                  </li>
                </ul>
                <a href="#/book" onClick={() => setShowOfferModal(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-semibold text-white transition hover:from-amber-600 hover:to-yellow-600">
                  Claim Offer <ChevronRight className="h-4 w-4" />
                </a>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Valid this week</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Nashik</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
