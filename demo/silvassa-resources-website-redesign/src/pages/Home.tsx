import { Link } from "react-router-dom";
import Hero from "../sections/Hero";
import StatsBand from "../sections/StatsBand";
import Clientele from "../sections/Clientele";
import SectorsGrid from "../sections/SectorsGrid";
import RolesGrid from "../sections/RolesGrid";
import WhyGrid from "../sections/WhyGrid";
import CTABand from "../sections/CTABand";
import Testimonials from "../sections/Testimonials";
import ForApplicants from "../sections/ForApplicants";
import TrustBadges from "../sections/TrustBadges";
import CurrentOpenings from "../sections/CurrentOpenings";
import FAQ from "../sections/FAQ";
import { COMPANY } from "../data";
import { Icon } from "../components/Icons";
import { SectionHeading } from "../components/UI";

function IntroStrip() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="reveal relative">
            <div className="overflow-hidden rounded-3xl border border-white/[0.06]">
              <img
                src="https://images.pexels.com/photos/19544248/pexels-photo-19544248.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Welders at work in an industrial workshop"
                className="h-[420px] w-full object-cover transition duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 hidden w-56 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-base-800 to-base-900 p-5 shadow-2xl shadow-brand-500/10 sm:block">
              <div className="font-display text-4xl font-bold text-white">
                3<span className="text-brand-300">+</span>
              </div>
              <div className="mt-1 text-sm text-slate-300">decades of trusted manpower legacy</div>
            </div>
            <div className="absolute -left-4 -top-4 -z-10 h-28 w-28 animate-floaty rounded-2xl border border-brand-400/20 bg-gradient-to-br from-brand-500/10 to-accent-500/10" />
          </div>

          <div>
            <SectionHeading
              eyebrow="Welcome to Silvassa Resources"
              title="We change the world of work"
              center={false}
            />
            <p className="reveal mt-5 leading-relaxed text-slate-300">
              {COMPANY.full} began its journey in {COMPANY.founded} — a legacy of
              more than three decades, formally incorporated in {COMPANY.incorporated}.
              Founded by three visionary men, our aim is simple: connect needy
              people with suitable jobs while fulfilling the manpower needs of
              client companies.
            </p>
            <p className="reveal mt-4 leading-relaxed text-slate-300">
              We provide manpower under our own sponsorship — taking away our
              customers' worries about compensation, insurance and labour law.
            </p>
            <ul className="reveal mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Sponsored, compliant workforce",
                "Skilled & semi-skilled trades",
                "Pan-industry experience",
                "Dedicated payroll support",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300">
                    <Icon.check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="reveal mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                Learn about us
              </Link>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200"
              >
                Explore services
                <Icon.arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SafetyStrip() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Safety First"
              title="Where you work matters"
              subtitle="We partner only with companies that maintain strict safety, compliance and fair-work standards. Your wellbeing is never negotiable."
              center={false}
            />
            <ul className="reveal mt-6 space-y-3">
              {[
                "Proper safety gear and PPE provided",
                "Workplace hazard audits before every deployment",
                "Legal contracts — no verbal-only agreements",
                "Grievance redressal system always accessible",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300">
                    <Icon.check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal order-1 relative lg:order-2">
            <div className="overflow-hidden rounded-3xl border border-white/[0.06]">
              <img
                src="/images/safety.jpg"
                alt="Industrial safety equipment"
                className="h-[420px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -right-4 -bottom-4 -z-10 h-28 w-28 animate-floaty rounded-2xl border border-accent-400/20 bg-gradient-to-br from-accent-500/10 to-brand-500/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Clientele />
      <IntroStrip />
      <StatsBand />
      <TrustBadges />
      <SectorsGrid />
      <RolesGrid />
      <WhyGrid />
      <CurrentOpenings />
      <ForApplicants />
      <SafetyStrip />
      <Testimonials />
      <FAQ limit={5} />
      <CTABand />
    </>
  );
}
