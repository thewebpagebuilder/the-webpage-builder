import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { StickyMobileCTA } from "./components/ui/StickyMobileCTA";
import { CustomCursor } from "./components/ui/CustomCursor";
import { CookieConsent } from "./components/ui/CookieConsent";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { WhatsAppButton } from "./components/ui/WhatsAppButton";
import { trackPageView } from "./utils/analytics";

// Lazy Loaded Pages
const ServicesPage = lazy(() => import("./pages/ServicesPage").then(m => ({ default: m.ServicesPage })));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage").then(m => ({ default: m.PortfolioPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const BlogPage = lazy(() => import("./pages/BlogPage").then(m => ({ default: m.BlogPage })));
const DemosPage = lazy(() => import("./pages/DemosPage").then(m => ({ default: m.DemosPage })));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./pages/TermsPage").then(m => ({ default: m.TermsPage })));
const AdminLogin = lazy(() => import("./pages/AdminLogin").then(m => ({ default: m.AdminLogin })));
const AdminSetup = lazy(() => import("./pages/AdminSetup").then(m => ({ default: m.AdminSetup })));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const AdminResetPassword = lazy(() => import("./pages/AdminResetPassword").then(m => ({ default: m.AdminResetPassword })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Log pageview tracking event
    trackPageView(pathname);

    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

/**
 * Marketing layout — wraps all public pages with Navbar, Footer, SmoothScroll, etc.
 */
function MarketingLayout() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-white selection:text-black relative">
        <WhatsAppButton />
        <CustomCursor />
        <CookieConsent />
        <ScrollToTop />
        <Navbar />
        <StickyMobileCTA />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

/**
 * Bare layout — for admin pages. No Navbar, no Footer, no Lenis.
 * Native browser scroll only.
 */
function BareLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-white selection:text-black">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-blue-400 border-solid rounded-full animate-spin"></div></div>}>
        <Routes>
          {/* Marketing site (with header/footer/Lenis) */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/demos" element={<DemosPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Route>

          {/* Admin (no marketing chrome) */}
          <Route element={<BareLayout />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/reset-password" element={<AdminResetPassword />} />
            <Route
              path="/admin/setup"
              element={
                <ProtectedRoute requireSetup={false}>
                  <AdminSetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
