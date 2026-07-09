import Hero3D from "../components/Hero3D";
import AnimatedStats from "../components/AnimatedStats";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Technology from "../components/Technology";
import VideoTestimonials from "../components/VideoTestimonials";
import Offers from "../components/Offers";
import InsurancePartners from "../components/InsurancePartners";
import DentalTips from "../components/DentalTips";
import CTABanner from "../components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero3D />
      <AnimatedStats />
      <Services limit={6} showCta />
      <WhyUs />
      <Technology />
      <VideoTestimonials />
      <InsurancePartners />
      <DentalTips />
      <Offers />
      <CTABanner />
    </>
  );
}
