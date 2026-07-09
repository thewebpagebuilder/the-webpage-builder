import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import Gallery from "../components/Gallery";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import VideoTestimonials from "../components/VideoTestimonials";
import CTABanner from "../components/CTABanner";

const galleryItems = [
  { img: "https://i.vimeocdn.com/video/1724420056-6640452faba0bf1dbded185017498df4c2cb9d9cb08cba268b0a28de38de3d31-d", title: "Clinic Atmosphere", tag: "Clinic", span: "sm:col-span-2 sm:row-span-2" },
  { img: "https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-e7f0220.png", title: "Digital Treatment Room", tag: "Technology", span: "" },
  { img: "https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-a394ec2.png", title: "Expert Care", tag: "Team", span: "" },
  { img: "https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-5099700.png", title: "Comfortable Clinic", tag: "Care", span: "sm:col-span-2" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Smile Gallery" title="Real Results, Real Smiles" subtitle="Explore the transformations, technology and welcoming space at Dr. Agrawal's." crumbs={[{ label: "Gallery" }]} />
      <Gallery />
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center"><span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Inside The Clinic</span><h2 className="font-display text-3xl font-bold text-black sm:text-4xl">A Space Designed for Your Comfort</h2></div>
          <div className="grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-4">
            {galleryItems.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={`group relative overflow-hidden rounded-3xl ${item.span}`}>
                <img src={item.img} alt={item.title} className="warm-live-image h-full w-full object-cover transition duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = "/images/clinic-chair.jpg"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">{item.tag}</span>
                  <p className="mt-1.5 font-display text-lg font-bold text-white">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-amber-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center"><span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Compare Results</span><h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Interactive Transformations</h2></motion.div>
          <div className="grid gap-8 md:grid-cols-2">
            <BeforeAfterSlider beforeImage="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-5099700.png" afterImage="https://i.vimeocdn.com/video/1724420056-6640452faba0bf1dbded185017498df4c2cb9d9cb08cba268b0a28de38de3d31-d" title="Clinic Experience" subtitle="Drag to compare visuals" />
            <BeforeAfterSlider beforeImage="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-a394ec2.png" afterImage="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-e7f0220.png" title="Digital Technology" subtitle="Warm, modern dentistry" />
          </div>
        </div>
      </section>
      <VideoTestimonials />
      <CTABanner />
    </>
  );
}
