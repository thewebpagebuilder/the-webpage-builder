import { useState } from "react";
import { Icon } from "../components/Icons";
import { SectionHeading } from "../components/UI";

const FAQS = [
  {
    q: "Are there any charges for workers to register with you?",
    a: "Absolutely not. We never charge workers any fees — our clients pay us for our services. Your earnings stay yours.",
  },
  {
    q: "How quickly can you deploy manpower for my company?",
    a: "We maintain a ready bench of skilled and semi-skilled workers. Standard deployments happen within 24-72 hours depending on role complexity and volume.",
  },
  {
    q: "Do you handle PF, ESIC and all statutory compliance?",
    a: "Yes — we take complete ownership. Every worker deployed under our sponsorship has full PF, ESIC, insurance and statutory coverage handled end-to-end.",
  },
  {
    q: "What documents do I need to apply as a worker?",
    a: "Bring your Aadhaar card, PAN card, bank account details, and any trade certificates or experience letters. We handle all statutory registrations.",
  },
  {
    q: "Which industries and locations do you cover?",
    a: "We serve 14+ industries across 6+ states including manufacturing, pharmaceutical, textile, chemical, engineering, food processing and more. Headquartered in Silvassa, D&NH.",
  },
  {
    q: "Do you offer long-term placements or only contract work?",
    a: "Both. We offer contract staffing for short-term projects and long-term placements with stable companies. Many of our workers have been with us for 5+ years.",
  },
  {
    q: "What trades and skills do you recruit for?",
    a: "Welders, fitters, machinists, electricians, painters, lab technicians, data entry operators, helpers and skilled resources across all industrial trades.",
  },
  {
    q: "Is salary paid on time? How is it handled?",
    a: "Yes — salary is paid on time every month without fail. We manage the complete payroll including PF, ESIC and all statutory deductions transparently.",
  },
];

export default function FAQ({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const items = limit ? FAQS.slice(0, limit) : FAQS;

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Frequently asked"
          title="Got questions? We've got answers"
          subtitle="Whether you're a company looking for manpower or a worker seeking opportunities."
        />
        <div className="mt-14 space-y-3">
          {items.map((f, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <div
                className={`overflow-hidden rounded-2xl border bg-gradient-to-br from-white/[0.04] to-transparent transition-colors duration-300 ${
                  open === i ? "border-brand-400/40" : "border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-white">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                      open === i
                        ? "rotate-45 bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30"
                        : "border border-white/10 text-brand-300"
                    }`}
                  >
                    <Icon.plus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 leading-relaxed text-slate-300">{f.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
