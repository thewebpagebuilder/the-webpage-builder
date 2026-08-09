"use client";
import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Clock, Calendar, Sparkles, Phone, Mail,
  ChevronLeft, ChevronRight, User, Globe, MessageSquare
} from "lucide-react";
import { openMail } from "@/lib/scroll";
import { saveLead } from "@/lib/leads";
import { trackEvent } from "@/utils/analytics";

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WHAT_YOU_GET = [
  "30-minute strategy call with a senior engineer",
  "Custom assessment of your current digital presence",
  "Tailored project roadmap with timeline & investment",
  "Zero obligation — cancel anytime, no strings attached",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(date: Date | null) {
  if (!date) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateDisplay(date: Date | null) {
  if (!date) return "";
  return `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
}

export function Contact() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const formRef = useRef<HTMLDivElement>(null);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleField = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    if (!formData.name || !formData.email) return;
    setSubmitting(true);
    
    try {
      await saveLead({
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        website: formData.website || "",
        message: formData.message || "",
        source: "call",
        scheduledDate: selectedDate.toISOString(),
        scheduledTime: selectedTime,
      });
      
      // Track conversion event
      trackEvent("lead_submission_success", {
        source: "call",
        email: formData.email,
        scheduledDate: selectedDate.toISOString().split("T")[0],
        scheduledTime: selectedTime,
      });

      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to book strategy call with Supabase:", error);
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({});
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(viewYear, viewMonth, d));
    return days;
  }, [viewYear, viewMonth, daysInMonth, firstDay]);

  const isPast = (date: Date) => date.getTime() < today.getTime();
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  const isDateSelectable = (date: Date) => !isPast(date) && !isWeekend(date);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const canGoPrev = () => {
    if (viewYear > today.getFullYear()) return true;
    if (viewYear === today.getFullYear() && viewMonth > today.getMonth()) return true;
    return false;
  };

  return (
    <section
      className="py-20 sm:py-24 md:py-32 bg-zinc-950 relative overflow-hidden border-t border-zinc-900"
      id="contact"
    >
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] md:w-[900px] h-[500px] sm:h-[700px] md:h-[900px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">

          {/* Left — Headline + Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32"
          >
            <span className="text-zinc-400 font-mono text-xs sm:text-sm block mb-3 sm:mb-4">/ Let's Build Together</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-5 sm:mb-6 leading-[1.05]">
              Ready to scale your<br className="hidden sm:block" /> digital business?
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-10 max-w-lg">
              Book a free 30-minute strategy call with one of our senior engineers. We'll audit your current platform, identify growth bottlenecks, and map out a roadmap — before you spend a single rupee.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {WHAT_YOU_GET.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]" />
                  <span className="text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-zinc-800/50">
              <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400 text-[10px] sm:text-xs">
                <Clock size={11} className="sm:w-3 sm:h-3" />
                <span>30 min call</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400 text-[10px] sm:text-xs">
                <Calendar size={11} className="sm:w-3 sm:h-3" />
                <span>Flexible scheduling</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400 text-[10px] sm:text-xs">
                <Sparkles size={11} className="sm:w-3 sm:h-3" />
                <span>100% free, zero obligation</span>
              </div>
            </div>

            {/* Direct contact */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => openMail("thewebpagebuilder@gmail.com", "Project Inquiry", "Hi, I'd like to discuss a project.")}
                className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors text-left"
              >
                <Mail size={12} className="sm:w-[14px] sm:h-[14px]" />
                thewebpagebuilder@gmail.com
              </button>
              <button
                onClick={scrollToForm}
                className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors text-left"
              >
                <Phone size={12} className="sm:w-[14px] sm:h-[14px]" />
                Schedule a Call
              </button>
              <a
                href="/demos"
                className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors text-left"
              >
                <Globe size={12} className="sm:w-[14px] sm:h-[14px]" />
                View Demo Projects
              </a>
            </div>
          </motion.div>

          {/* Right — Scheduling Card */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl border border-zinc-800/50 bg-zinc-900/30 relative overflow-hidden overscroll-contain"
              data-lenis-prevent
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">
                      Book Your Free Strategy Call
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm">
                      Pick a date and time that works for you.
                    </p>
                  </div>

                  {/* Date Picker */}
                  <div className="mb-5 sm:mb-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={!canGoPrev()}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-zinc-400 hover:text-white"
                        aria-label="Previous month"
                      >
                        <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
                      </button>
                      <h4 className="text-sm sm:text-base font-semibold text-white">
                        {MONTH_NAMES[viewMonth]} {viewYear}
                      </h4>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 transition-colors flex items-center justify-center text-zinc-400 hover:text-white"
                        aria-label="Next month"
                      >
                        <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    {/* Day labels */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
                      {DAY_NAMES.map((d) => (
                        <div key={d} className="text-center text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400 font-medium py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                      {calendarDays.map((date, i) => {
                        if (!date) return <div key={`empty-${i}`} />;
                        const selectable = isDateSelectable(date);
                        const isSelected = selectedDate && formatDateKey(date) === formatDateKey(selectedDate);
                        const isToday = formatDateKey(date) === formatDateKey(today);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => selectable && setSelectedDate(date)}
                            disabled={!selectable}
                            className={`aspect-square rounded-md sm:rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                              !selectable
                                ? "text-zinc-700 cursor-not-allowed"
                                : isSelected
                                  ? "bg-white text-black"
                                  : isToday
                                    ? "border border-emerald-400/50 text-white hover:bg-zinc-800"
                                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            }`}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-5 sm:mb-6"
                    >
                      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                        <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium">
                          Available times
                        </h4>
                        <span className="text-[10px] sm:text-xs text-zinc-400">
                          {formatDateDisplay(selectedDate)} · IST
                        </span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`h-9 sm:h-10 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                              selectedTime === time
                                ? "bg-white text-black"
                                : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Form fields */}
                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 sm:space-y-4 mb-5 sm:mb-6"
                    >
                      <FieldInput
                        icon={User}
                        name="name"
                        type="text"
                        placeholder="Your name *"
                        value={formData.name || ""}
                        onChange={(v) => handleField("name", v)}
                        required
                      />
                      <FieldInput
                        icon={Mail}
                        name="email"
                        type="email"
                        placeholder="you@company.com *"
                        value={formData.email || ""}
                        onChange={(v) => handleField("email", v)}
                        required
                      />
                      <FieldInput
                        icon={Globe}
                        name="website"
                        type="url"
                        placeholder="Your website URL (optional)"
                        value={formData.website || ""}
                        onChange={(v) => handleField("website", v)}
                      />
                      <div className="relative">
                        <MessageSquare size={14} className="absolute left-3.5 sm:left-4 top-3 sm:top-3.5 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                        <textarea
                          name="message"
                          value={formData.message || ""}
                          onChange={(e) => handleField("message", e.target.value)}
                          placeholder="Briefly describe your project or challenge..."
                          rows={4}
                          className="w-full pl-10 sm:pl-11 pr-3.5 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || submitting}
                    className="w-full h-12 rounded-full bg-white text-black text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Sparkles size={12} className="sm:w-[14px] sm:h-[14px]" />
                        Book Free Strategy Call
                        <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px]" />
                      </>
                    )}
                  </button>

                  <p className="text-zinc-400 text-[10px] sm:text-[11px] text-center mt-3 sm:mt-4">
                    We'll never spam you. Your info is safe with us. NDA available on request.
                  </p>
                </form>
              ) : (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 sm:py-12 text-center"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                    <CheckCircle2 size={24} className="text-emerald-400 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">You're all set!</h3>
                  <p className="text-zinc-400 text-sm sm:text-base font-light max-w-sm mx-auto mb-2 sm:mb-3">
                    Your strategy call is booked for
                  </p>
                  <p className="text-white text-base sm:text-lg font-semibold mb-6 sm:mb-8">
                    {formatDateDisplay(selectedDate)} at {selectedTime} IST
                  </p>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-sm mx-auto mb-6 sm:mb-8">
                    We'll send a confirmation email to{" "}
                    <span className="text-zinc-300 font-medium">{formData.email}</span> with the calendar invite. Prepare your questions — our senior engineer is ready.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
                  >
                    Book another slot
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FieldInputProps {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  name: string;
  type: "text" | "email" | "url" | "tel";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function FieldInput({ icon: Icon, name, type, placeholder, value, onChange, required }: FieldInputProps) {
  return (
    <div className="relative">
      {Icon && (
        <Icon size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full h-11 sm:h-12 ${Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"} pr-3.5 sm:pr-4 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors`}
      />
    </div>
  );
}
