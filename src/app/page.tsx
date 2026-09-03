import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import { FloatingCoderSection } from "@/components/3d/FloatingCoder";
import { Process } from "@/components/sections/Process";
import { DevObjects3D } from "@/components/3d/DevObjects3D";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { GetQuotation } from "@/components/sections/GetQuotation";
import { FreeAudit } from "@/components/sections/FreeAudit";
import { Testimonials } from "@/components/sections/Testimonials";
import { TechOrbit } from "@/components/3d/TechOrbit";
import { InteractiveTerminal3D } from "@/components/3d/InteractiveTerminal3D";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";


export default function HomePage() {
  return (
    <>
      {/* 1. Hero + 3D morphing object */}
      <Hero />

      {/* 2. Client trust bar + logos */}
      <ClientLogos />

      {/* 3. Featured portfolio work */}
      <FeaturedWork />

      {/* 4. Services accordion */}
      <Services />

      {/* 5. 🆕 3D Cartoon Coder — mouse-tracking character */}
      <FloatingCoderSection />

      {/* 6. Process timeline with scroll-linked line */}
      <Process />

      {/* 7. 🆕 3D Dev Objects — browser, phones, code brackets */}
      <DevObjects3D />

      {/* 8. Why Choose Us */}
      <WhyChooseUs />

      {/* 9. Get Quotation CTA */}
      <GetQuotation />

      {/* 10. Free Audit CTA */}
      <FreeAudit />

      {/* 11. Testimonials marquee */}
      <Testimonials />

      {/* 12. 🆕 Tech Orbit 3D Globe */}
      <TechOrbit />

      {/* 13. 🆕 Interactive 3D Terminal */}
      <InteractiveTerminal3D />

      {/* 14. FAQ */}
      <FAQ />

      {/* 15. Contact form */}
      <Contact />
    </>
  );
}
