import { Hero } from "../components/sections/Hero";
import { ClientLogos } from "../components/sections/ClientLogos";
import { FeaturedWork } from "../components/sections/FeaturedWork";
import { Services } from "../components/sections/Services";
import { Process } from "../components/sections/Process";
import { WhyChooseUs } from "../components/sections/WhyChooseUs";
import { GetQuotation } from "../components/sections/GetQuotation";
import { FreeAudit } from "../components/sections/FreeAudit";
import { Testimonials } from "../components/sections/Testimonials";
import { TechStack } from "../components/sections/TechStack";
import { FAQ } from "../components/sections/FAQ";
import { Contact } from "../components/sections/Contact";
import { SEO } from "../components/seo/SEO";

export function HomePage() {
  return (
    <>
      <SEO />
      <Hero />
      <ClientLogos />
      <FeaturedWork />
      <Services />
      <Process />
      <WhyChooseUs />
      <GetQuotation />
      <FreeAudit />
      <Testimonials />
      <TechStack />
      <FAQ />
      <Contact />
    </>
  );
}
