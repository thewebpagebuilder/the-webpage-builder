import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { BackToTop, ScrollProgress } from "./UI";
import { useReveal } from "../hooks/useReveal";

export default function Layout() {
  const location = useLocation();
  const [display, setDisplay] = useState(location.pathname);
  const [phase, setPhase] = useState<"in" | "out">("in");

  // Fade out, swap content, fade in on route change.
  useEffect(() => {
    if (location.pathname === display) return;
    setPhase("out");
    const t = window.setTimeout(() => {
      setDisplay(location.pathname);
      window.scrollTo({ top: 0, behavior: "auto" });
      setPhase("in");
    }, 220);
    return () => window.clearTimeout(t);
  }, [location.pathname, display]);

  useReveal(display);

  return (
    <div className="min-h-screen bg-base-950 text-slate-200 antialiased">
      <ScrollProgress />
      <Header />
      <main
        className={`transition-all duration-200 ${
          phase === "out" ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
