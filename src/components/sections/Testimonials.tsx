"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "They completely transformed our digital presence. The new platform is not only beautiful but incredibly fast. Our team adoption went from 40% to 97% overnight.",
    author: "Sarah Jenkins",
    role: "CTO, Vault Finance",
    rating: 5,
    company: "Vault Finance",
    initials: "SJ"
  },
  {
    quote: "The team's grasp of modern web architecture is unmatched. They delivered a complex AI integration months ahead of schedule. Physicians saved 15+ hours per week.",
    author: "Dr. Amir Patel",
    role: "Chief of Medicine, MediSync",
    rating: 5,
    company: "MediSync",
    initials: "AP"
  },
  {
    quote: "A rare breed of agency that truly understands both world-class design and heavy-duty engineering. Our checkout completion rate rose 62% within 30 days.",
    author: "Elena Rodriguez",
    role: "VP Digital, Luxe Commerce",
    rating: 5,
    company: "Luxe Commerce",
    initials: "ER"
  },
  {
    quote: "What took 72 hours now takes 7.2 seconds. Nexus Analytics replaced our entire reporting workflow. The ROI was immediate — $8M ARR in Year 1.",
    author: "Carlos Vega",
    role: "COO, GlobalTranz",
    rating: 5,
    company: "GlobalTranz",
    initials: "CV"
  },
  {
    quote: "Our new website finally looks and feels like our work. Clients land on the homepage and say 'wow' — that's priceless. Time on site increased 4.7x.",
    author: "Jordan Lee",
    role: "Founder, Studio Alpha",
    rating: 5,
    company: "Studio Alpha",
    initials: "JL"
  },
  {
    quote: "We're a 20-year-old company and we feel like a startup again. Brand recall is up 48% and our customer acquisition cost dropped by 37%. Incredible results.",
    author: "Ananya Sharma",
    role: "CMO, Aura Branding",
    rating: 5,
    company: "Aura",
    initials: "AS"
  },
  {
    quote: "Our CISO now sleeps through the night. Quantum Core transformed our threat posture overnight — false positives dropped from 92% to 18%.",
    author: "Richard Okafor",
    role: "Director of Security, Quantum Corp",
    rating: 5,
    company: "Quantum",
    initials: "RO"
  },
  {
    quote: "Sales reps actually volunteer to use Flow. That's something we'd never heard of before. Forecast accuracy went from 58% to 89%. Game changer.",
    author: "Kate Whitmore",
    role: "VP Sales, Flow CRM",
    rating: 5,
    company: "Flow",
    initials: "KW"
  }
];

export function Testimonials() {
  const row2Unique = [
    ...TESTIMONIALS.slice(4),
    ...TESTIMONIALS.slice(0, 4)
  ];

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background border-t border-border overflow-hidden relative">
      {/* Decorative gradient glow bubbles */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none animate-pulse-slow-delayed" />

      {/* Header */}
      <div className="container px-5 sm:px-6 mx-auto mb-12 sm:mb-16 text-center relative z-10">
        <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-3 sm:mb-4">/ Client Testimonials</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3 px-2">
          Trusted by <span className="text-primary">350+ teams</span> worldwide.
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg font-light max-w-lg mx-auto px-2">
          Real results. Real clients. Real impact on their businesses.
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4 sm:mb-6 z-10">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex flex-row w-max py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" }}
        >
          <div className="flex flex-row flex-shrink-0">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={`r1-a-${i}`} className="pr-3 sm:pr-6 flex-shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          <div className="flex flex-row flex-shrink-0">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={`r1-b-${i}`} className="pr-3 sm:pr-6 flex-shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative z-10">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex flex-row w-max py-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" }}
        >
          <div className="flex flex-row flex-shrink-0">
            {row2Unique.map((testimonial, i) => (
              <div key={`r2-a-${i}`} className="pr-3 sm:pr-6 flex-shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          <div className="flex flex-row flex-shrink-0">
            {row2Unique.map((testimonial, i) => (
              <div key={`r2-b-${i}`} className="pr-3 sm:pr-6 flex-shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trust bar below */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="container px-5 sm:px-6 mx-auto mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-muted-foreground text-[10px] sm:text-xs font-medium"
      >
        <span className="flex items-center gap-1.5">
          <Star size={11} className="text-accent fill-accent sm:w-3 sm:h-3" />
          <span>4.9/5 avg. rating</span>
        </span>
        <span className="text-border">·</span>
        <span>350+ happy clients</span>
        <span className="text-border">·</span>
        <span>5+ years in business</span>
        <span className="text-border">·</span>
        <span>NDA-ready on every project</span>
      </motion.div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[number] }) {
  return (
    <div className="w-[280px] sm:w-[340px] md:w-[380px] flex-shrink-0 p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/20 whitespace-normal transition-colors cursor-default group">
      {/* Stars */}
      <div className="flex gap-0.5 mb-3 sm:mb-5">
        {Array.from({ length: testimonial.rating }).map((_, si) => (
          <Star key={si} size={11} className="text-accent fill-accent sm:w-[13px] sm:h-[13px]" />
        ))}
      </div>

      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-4 sm:mb-6 line-clamp-5">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center text-[10px] sm:text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <p className="text-foreground font-medium text-xs sm:text-sm truncate">
            {testimonial.author}
          </p>
          <p className="text-muted-foreground text-[10px] sm:text-xs truncate">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
