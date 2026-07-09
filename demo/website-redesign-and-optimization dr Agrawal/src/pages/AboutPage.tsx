import { motion } from "framer-motion";
import { Target, HeartHandshake, Award, CheckCircle2 } from "lucide-react";
import PageHero from "../components/PageHero";
import AnimatedStats from "../components/AnimatedStats";
import WhyUs from "../components/WhyUs";
import Technology from "../components/Technology";
import Team from "../components/Team";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import VideoTestimonials from "../components/VideoTestimonials";
import CTABanner from "../components/CTABanner";

const values = [
  { icon: Target, title: "Our Mission", desc: "To deliver honest, high-quality dental care that makes every patient feel comfortable, informed and confident." },
  { icon: HeartHandshake, title: "Our Promise", desc: "Painless treatments, transparent pricing and genuine care — we treat every patient like family." },
  { icon: Award, title: "Our Standards", desc: "Continuous learning, world-class technology and strict sterilisation protocols." },
];
const highlights = ["Hospital-grade sterilisation", "Digital workflow", "Specialists in orthodontics & implants", "Flexible EMI options", "Evening appointments", "Child-friendly approach"];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Where Quality Dentistry Meets Care & Comfort" subtitle="For over 15 years, Dr. Agrawal's Dental Clinic has been transforming dental experiences in Nashik." crumbs={[{ label: "About" }]} />
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <img
                src="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-a394ec2.png"
                alt="Dr. Agrawal"
                className="warm-live-image rounded-3xl shadow-xl"
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/doctor-portrait.jpg"; }}
              />
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-4 text-white shadow-lg sm:block">
                <p className="font-display text-3xl font-bold">15+</p><p className="text-sm text-amber-100">Years of Excellence</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Our Story</span>
              <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">A Passion for Healthy, Beautiful Smiles</h2>
              <div className="mt-4 space-y-4 text-slate-600">
                <p>We believe that every smile has a story to tell. Our passion is to transform your dental experience into one that's not only pain-free but truly enjoyable.</p>
                <p>With a commitment to excellence and a team of caring professionals, we're dedicated to helping you achieve a radiant smile that lights up your life.</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {highlights.map((h) => (<div key={h} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><span className="text-sm text-slate-700">{h}</span></div>))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-amber-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center"><span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">What Drives Us</span><h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Our Mission, Promise & Standards</h2></div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-md"><value.icon className="h-6 w-6" /></div>
                <h3 className="mb-2 font-display text-xl font-bold text-black">{value.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <AnimatedStats />
      <Team />
      <WhyUs />
      <Technology />
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center"><span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Transformations</span><h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Real Patient Results</h2></motion.div>
          <div className="grid gap-8 md:grid-cols-2">
            <BeforeAfterSlider beforeImage="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-5099700.png" afterImage="https://i.vimeocdn.com/video/1724420056-6640452faba0bf1dbded185017498df4c2cb9d9cb08cba268b0a28de38de3d31-d" title="Digital Dental Care" subtitle="Comfort focused experience" />
            <BeforeAfterSlider beforeImage="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-a394ec2.png" afterImage="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-e7f0220.png" title="Modern Clinic Technology" subtitle="Digital dentistry workflow" />
          </div>
        </div>
      </section>
      <VideoTestimonials />
      <CTABanner />
    </>
  );
}
