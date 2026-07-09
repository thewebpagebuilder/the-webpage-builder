import PageHero from "../components/PageHero";
import Appointment from "../components/Appointment";
import FAQ from "../components/FAQ";
import CTABanner from "../components/CTABanner";

export default function BookPage() {
  return (
    <>
      <PageHero eyebrow="Book Appointment" title="Reserve Your Visit in 60 Seconds" subtitle="Choose your treatment, date and time. We'll confirm your slot instantly via WhatsApp." crumbs={[{ label: "Book Appointment" }]} />
      <Appointment />
      <FAQ />
      <CTABanner />
    </>
  );
}
