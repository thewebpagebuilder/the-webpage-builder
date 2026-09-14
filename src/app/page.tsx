import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import dynamic from 'next/dynamic';

const FloatingCoderSection = dynamic(() => import("@/components/3d/FloatingCoder").then(mod => mod.FloatingCoderSection), { ssr: false });
const DevObjects3D = dynamic(() => import("@/components/3d/DevObjects3D").then(mod => mod.DevObjects3D), { ssr: false });
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { GetQuotation } from "@/components/sections/GetQuotation";
import { FreeAudit } from "@/components/sections/FreeAudit";
import { Testimonials } from "@/components/sections/Testimonials";
import { TechStack } from "@/components/sections/TechStack";
const TechOrbit = dynamic(() => import("@/components/3d/TechOrbit").then(mod => mod.TechOrbit), { ssr: false });
const InteractiveTerminal3D = dynamic(() => import("@/components/3d/InteractiveTerminal3D").then(mod => mod.InteractiveTerminal3D), { ssr: false });
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Process } from "@/components/sections/Process";

export default function HomePage() {
  return (
    <>

      {/* 1. Hero — now with 3D Floating Coder embedded on the right */}
      <Hero />

      {/* 2. Client trust bar + logos */}
      <ClientLogos />

      {/* 3. Featured portfolio work */}
      <FeaturedWork />

      {/* 4. Services accordion */}
      <Services />

      {/* Scattered inline 3D Dev Objects */}
      <DevObjects3D />

      {/* 5. 3D Cartoon Coder — standalone section with text */}
      <FloatingCoderSection />

      {/* 6. Process timeline with scroll-linked line */}
      <Process />


      {/* 8. Why Choose Us */}
      <WhyChooseUs />

      {/* 9. Get Quotation CTA (with form modal) */}
      <GetQuotation />

      {/* 10. Free Audit CTA (with form modal) */}
      <FreeAudit />


      {/* 11. Testimonials marquee */}
      <Testimonials />

      {/* 12. Tech Stack Bento Grid */}
      <TechStack />

      {/* 13. Tech Orbit 3D Globe */}
      <TechOrbit />

      {/* 14. Interactive 3D Terminal */}
      <InteractiveTerminal3D />

      {/* 15. FAQ */}
      <FAQ />

      {/* 16. Contact form */}
      <Contact />
    </>
  );
}
