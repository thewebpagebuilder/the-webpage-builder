import PageHero from "../components/PageHero";
import Contact from "../components/Contact";
import CTABanner from "../components/CTABanner";

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact Us" title="Better Yet, See Us in Person!" subtitle="We love our patients, so feel free to visit during normal business hours. Call, message or drop by — we're here to help you smile." crumbs={[{ label: "Contact" }]} />
      <Contact />
      <CTABanner />
    </>
  );
}
