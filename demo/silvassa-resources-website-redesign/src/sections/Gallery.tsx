import { SectionHeading } from "../components/UI";

const GALLERY = [
  {
    url: "https://images.pexels.com/photos/8246480/pexels-photo-8246480.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Textile yarn production line in Indian factory",
    caption: "Textile Manufacturing",
  },
  {
    url: "https://images.pexels.com/photos/31321032/pexels-photo-31321032.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Worker operating sewing machine in textile factory",
    caption: "Textile Industry",
  },
  {
    url: "https://images.pexels.com/photos/36423786/pexels-photo-36423786.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Worker inspecting industrial chemicals in factory",
    caption: "Chemical Processing",
  },
  {
    url: "https://images.pexels.com/photos/20379378/pexels-photo-20379378.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Industrial worker handling barrels in warehouse",
    caption: "Oil & Lubricants",
  },
  {
    url: "https://images.pexels.com/photos/31212936/pexels-photo-31212936.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Textile factory worker monitoring machinery",
    caption: "Textile Manufacturing",
  },
  {
    url: "https://images.pexels.com/photos/32399706/pexels-photo-32399706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Indian textile worker sorting fabric",
    caption: "Textile Processing",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Work in Action"
          title="Inside the industries we power"
          subtitle="Real scenes from the factories, plants and workshops where our manpower makes an impact every day."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.06]"
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-base-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-300 backdrop-blur">
                  {img.caption}
                </div>
              </div>
              <div className="absolute right-4 top-4 rounded bg-base-950/60 px-2 py-0.5 font-mono text-[10px] text-white/70 backdrop-blur">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
        <p className="reveal mt-8 text-center text-xs text-slate-500">
          All images represent the kind of environments and industries we serve across India.
        </p>
      </div>
    </section>
  );
}
