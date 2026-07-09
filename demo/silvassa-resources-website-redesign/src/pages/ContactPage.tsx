import { useState } from "react";
import PageHero from "../sections/PageHero";
import FAQ from "../sections/FAQ";
import { COMPANY } from "../data";
import { Icon, type IconName } from "../components/Icons";

const DETAILS: { icon: IconName; title: string; lines: string[]; href?: string }[] = [
  { icon: "phone", title: "Call Us", lines: [COMPANY.phone], href: `tel:${COMPANY.phoneRaw}` },
  { icon: "mail", title: "Mail Us", lines: [COMPANY.email], href: `mailto:${COMPANY.email}` },
  { icon: "pin", title: "Visit Us", lines: [COMPANY.address], href: COMPANY.mapUrl },
  { icon: "clock", title: "Working Hours", lines: [COMPANY.hoursWeek, COMPANY.hoursWeekend] },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0ACompany: ${form.company}%0D%0A%0D%0A${form.message}`;
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      form.subject || "Manpower Enquiry"
    )}&body=${body}`;
    setSent(true);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputCls =
    "w-full rounded-xl border border-white/[0.08] bg-base-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-brand-400/60 focus:ring-2 focus:ring-brand-400/20";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build your workforce together"
        subtitle="Looking for manpower to boost your business as per your defined goals, or have a query? Fill the form or give us a quick call."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Details */}
            <div className="lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {DETAILS.map((d, i) => {
                  const I = Icon[d.icon];
                  const content = (
                    <div className="group relative overflow-hidden flex gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-5 transition hover:-translate-y-0.5 hover:border-brand-400/30">
                      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/25" />
                      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                        <I className="h-5 w-5" />
                      </span>
                      <div className="relative">
                        <div className="font-display text-sm font-semibold text-white">{d.title}</div>
                        {d.lines.map((l) => (
                          <p key={l} className="mt-1 text-sm leading-relaxed text-slate-400">{l}</p>
                        ))}
                      </div>
                    </div>
                  );
                  return (
                    <div key={d.title} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                      {d.href ? (
                        <a href={d.href} target={d.icon === "pin" ? "_blank" : undefined} rel="noreferrer" className="block">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="reveal mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-brand-500/[0.10] to-accent-500/[0.10] p-6 text-center backdrop-blur">
                <p className="text-sm text-slate-300">Call us now on</p>
                <a href={`tel:${COMPANY.phoneRaw}`} className="font-display text-2xl font-bold gradient-text">
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="reveal relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-8 lg:col-span-3"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
              <div className="relative">
                <h2 className="font-display text-xl font-bold text-white">Get in touch</h2>
                <p className="mt-1 text-sm text-slate-400">We respond promptly to every enquiry.</p>

                {sent && (
                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-brand-400/30 bg-brand-500/10 px-4 py-3 text-sm text-brand-200">
                    <Icon.check className="h-4 w-4" /> Your mail client should now be open. Thank you!
                  </div>
                )}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">Name *</label>
                    <input required value={form.name} onChange={set("name")} className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">Company</label>
                    <input value={form.company} onChange={set("company")} className={inputCls} placeholder="Company name" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">Subject *</label>
                    <input required value={form.subject} onChange={set("subject")} className={inputCls} placeholder="How can we help?" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={set("message")} className={inputCls} placeholder="Tell us about your manpower requirements…" />
                </div>
                <button
                  type="submit"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-500/30 transition hover:shadow-brand-500/50 hover:brightness-110 sm:w-auto"
                >
                  Send Message
                  <Icon.arrow className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>

          {/* Map */}
          <div className="reveal mt-10 overflow-hidden rounded-3xl border border-white/[0.06]">
            <iframe
              title="Silvassa Resources location"
              src="https://www.google.com/maps?q=Landmark+Business+Hub+Tokarkhada+Silvassa&output=embed"
              className="h-80 w-full grayscale-[0.5] invert-[0.92] hue-rotate-180 contrast-[0.95]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <FAQ limit={6} />
    </>
  );
}
