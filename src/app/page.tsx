import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import { FloatingCoderSection } from "@/components/3d/FloatingCoder";
import { Process } from "@/components/sections/Process";
import { DevObjects3D, ScatteredDevObjects } from "@/components/3d/DevObjects3D";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { GetQuotation } from "@/components/sections/GetQuotation";
import { FreeAudit } from "@/components/sections/FreeAudit";
import { Testimonials } from "@/components/sections/Testimonials";
import { TechStack } from "@/components/sections/TechStack";
import { TechOrbit } from "@/components/3d/TechOrbit";
import { InteractiveTerminal3D } from "@/components/3d/InteractiveTerminal3D";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";


export default function HomePage() {
  return (
    <>
      {/* 🆕 Scattered 3D dev objects floating across the ENTIRE page background */}
      <ScatteredDevObjects />

      {/* 1. Hero — now with 3D Floating Coder embedded on the right */}
      <Hero />

      {/* 2. Client trust bar + logos */}
      <ClientLogos />

      {/* 3. Featured portfolio work */}
      <FeaturedWork />

      {/* 4. Services accordion */}
      <Services />

      {/* 5. 3D Cartoon Coder — standalone section with text */}
      <FloatingCoderSection />

      {/* 6. Process timeline with scroll-linked line */}
      <Process />

      {/* 7. 3D Dev Objects — concentrated browser/phones/brackets */}
      <DevObjects3D />

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
