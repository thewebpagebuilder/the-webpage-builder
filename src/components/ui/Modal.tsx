"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Sparkles, Mail, User, Globe, MessageSquare, Building2, Phone, FileText, Calculator } from "lucide-react";
import { saveLead } from "@/lib/leads";
import { trackEvent } from "@/utils/analytics";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "tel" | "textarea" | "select";
  placeholder: string;
  required?: boolean;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  options?: string[];
}

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  variant: "audit" | "demo" | "quotation";
}

const AUDIT_FIELDS: FormField[] = [
  { name: "name", label: "Your name", type: "text", placeholder: "John Doe", required: true, icon: User },
  { name: "email", label: "Work email", type: "email", placeholder: "you@company.com", required: true, icon: Mail },
  { name: "website", label: "Your website URL", type: "url", placeholder: "https://yourcompany.com", required: true, icon: Globe },
  { name: "challenge", label: "Biggest digital challenge", type: "textarea", placeholder: "What's holding your business back online?", required: false, icon: MessageSquare },
];

const DEMO_FIELDS: FormField[] = [
  { name: "name", label: "Your name", type: "text", placeholder: "John Doe", required: true, icon: User },
  { name: "email", label: "Work email", type: "email", placeholder: "you@company.com", required: true, icon: Mail },
  { name: "company", label: "Company name", type: "text", placeholder: "Your Company", required: true, icon: Building2 },
  { name: "phone", label: "Phone number (optional)", type: "tel", placeholder: "+91 98765 43210", required: false, icon: Phone },
  { name: "vision", label: "Briefly describe your project vision", type: "textarea", placeholder: "Tell us what you want to build. We treat this as strictly confidential.", required: true, icon: MessageSquare },
];

const QUOTATION_FIELDS: FormField[] = [
  { name: "name", label: "Your name", type: "text", placeholder: "John Doe", required: true, icon: User },
  { name: "email", label: "Work email", type: "email", placeholder: "you@company.com", required: true, icon: Mail },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "+91 98765 43210", required: true, icon: Phone },
  { name: "company", label: "Company name (optional)", type: "text", placeholder: "Your Company", required: false, icon: Building2 },
  {
    name: "projectType", label: "Project type", type: "select", placeholder: "Select project type", required: true, icon: FileText,
    options: ["Website", "Web Application", "Mobile App", "Custom Software", "AI Solution", "UI/UX Design", "SEO & Growth", "Other"]
  },
  {
    name: "budget", label: "Estimated budget", type: "select", placeholder: "Select budget range", required: true, icon: Calculator,
    options: ["Under ₹50K", "₹50K – ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L+", "Not sure yet"]
  },
  {
    name: "timeline", label: "Desired timeline", type: "select", placeholder: "Select timeline", required: true, icon: Calculator,
    options: ["ASAP (Urgent)", "1–2 weeks", "1 month", "2–3 months", "Flexible"]
  },
  { name: "requirements", label: "Project requirements", type: "textarea", placeholder: "Briefly describe what you need built. The more detail, the more accurate your quote.", required: true, icon: MessageSquare },
];

const AUDIT_BENEFITS = [
  "Comprehensive website performance & SEO audit",
  "Core Web Vitals & speed benchmark report",
  "Conversion bottleneck analysis with fixes",
  "Security & accessibility quick-scan",
];

const DEMO_BENEFITS = [
  "Custom-built demo page tailored to your vision",
  "Strict NDA — your idea stays yours, period",
  "Reviewed by our senior engineer within 24 hours",
  "Completely free — no pitch deck, no obligation",
];

const QUOTATION_BENEFITS = [
  "Detailed cost breakdown based on your requirements",
  "Custom project timeline & milestone plan",
  "Recommended tech stack tailored to your needs",
  "Zero obligation — quote is yours to keep",
];

export function LeadFormModal({ open, onClose, variant }: LeadFormModalProps) {
  const fields = variant === "audit" ? AUDIT_FIELDS : variant === "demo" ? DEMO_FIELDS : QUOTATION_FIELDS;
  const benefits = variant === "audit" ? AUDIT_BENEFITS : variant === "demo" ? DEMO_BENEFITS : QUOTATION_BENEFITS;
  const isAudit = variant === "audit";
  const isQuotation = variant === "quotation";

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setFormData({});
        setSubmitted(false);
        setSubmitting(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const leadData: any = {
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
      company: formData.company || "",
      website: formData.website || "",
      message: formData.challenge || formData.vision || formData.requirements || formData.message || "",
      vision: formData.vision || "",
      challenge: formData.challenge || "",
      requirements: formData.requirements || "",
      projectType: formData.projectType || "",
      timeline: formData.timeline || "",
      budget: formData.budget || "",
      source: variant,
    };

    try {
      await saveLead(leadData);

      // Track conversion event
      trackEvent("lead_submission_success", {
        source: variant,
        email: formData.email,
        projectType: formData.projectType || variant,
      });

      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit lead to Supabase:", error);
      setSubmitting(false);
    }
  };

  const title = isAudit
    ? "Claim Your Free Digital Audit"
    : isQuotation
      ? "Get Your Project Quotation"
      : "Request a Private Demo";

  const subtitle = isAudit
    ? "We'll analyze your digital presence and send a custom report within 48 hours."
    : isQuotation
      ? "Tell us about your project. We'll send a detailed quote within 24 hours — no obligation."
      : "Tell us your vision. We'll build a custom demo page under strict NDA — completely free.";

  const submitText = isAudit
    ? "Request My Free Audit"
    : isQuotation
      ? "Get My Free Quote"
      : "Send My Private Request";

  const accentClass = isAudit
    ? "bg-emerald-400 text-zinc-950"
    : isQuotation
      ? "bg-blue-400 text-zinc-950"
      : "bg-white text-black";

  const accentHover = isAudit
    ? "hover:bg-emerald-300"
    : isQuotation
      ? "hover:bg-blue-300"
      : "hover:bg-zinc-200";

  const badgeBg = isAudit
    ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
    : isQuotation
      ? "text-blue-400 bg-blue-400/10 border-blue-400/20"
      : "text-zinc-300 bg-zinc-800/50 border-zinc-800";

  const badgeText = isAudit
    ? "100% Free — No Strings Attached"
    : isQuotation
      ? "Free Quote — 24 Hour Turnaround"
      : "Strict NDA — Completely Confidential";

  const benefitIconColor = isAudit ? "text-emerald-400" : isQuotation ? "text-blue-400" : "text-white";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overscroll-contain"
            data-lenis-prevent
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-colors"
              aria-label="Close"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            {!submitted ? (
              <div className="p-6 sm:p-8 md:p-10">
                {/* Header */}
                <div className="mb-6 sm:mb-8 pr-10">
                  <span className={`inline-block text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 rounded-full border mb-4 sm:mb-5 ${badgeBg}`}>
                    {badgeText}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-3 leading-[1.1]">
                    {title}
                  </h2>
                  <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
                    {subtitle}
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-3">
                    What you'll get
                  </p>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className={`flex-shrink-0 mt-0.5 sm:w-4 sm:h-4 ${benefitIconColor}`} />
                        <span className="text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {fields.map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.name}>
                        <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1.5 sm:mb-2">
                          {field.label} {field.required && <span className={isAudit ? "text-emerald-400" : isQuotation ? "text-blue-400" : "text-white"}>*</span>}
                        </label>
                        {field.type === "textarea" ? (
                          <div className="relative">
                            {Icon && (
                              <Icon size={14} className="absolute left-3.5 sm:left-4 top-3 sm:top-3.5 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                            )}
                            <textarea
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              placeholder={field.placeholder}
                              required={field.required}
                              rows={3}
                              className={`w-full ${Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"} pr-3.5 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors resize-none`}
                            />
                          </div>
                        ) : field.type === "select" ? (
                          <div className="relative">
                            {Icon && (
                              <Icon size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4 z-10" />
                            )}
                            <select
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              required={field.required}
                              className={`w-full h-11 sm:h-12 ${Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"} pr-8 sm:pr-10 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors appearance-none cursor-pointer ${!formData[field.name] ? "text-zinc-400" : ""}`}
                            >
                              <option value="" disabled className="bg-zinc-900">
                                {field.placeholder}
                              </option>
                              {field.options?.map((opt) => (
                                <option key={opt} value={opt} className="bg-zinc-900 text-white">
                                  {opt}
                                </option>
                              ))}
                            </select>
                            {/* Custom dropdown arrow */}
                            <svg
                              className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="relative">
                            {Icon && (
                              <Icon size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                            )}
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              placeholder={field.placeholder}
                              required={field.required}
                              className={`w-full h-11 sm:h-12 ${Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"} pr-3.5 sm:pr-4 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors`}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full h-12 mt-2 sm:mt-4 rounded-full ${accentClass} ${accentHover} text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2`}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        {isAudit ? <Sparkles size={12} className="sm:w-[14px] sm:h-[14px]" /> : isQuotation ? <Calculator size={12} className="sm:w-[14px] sm:h-[14px]" /> : <Mail size={12} className="sm:w-[14px] sm:h-[14px]" />}
                        {submitText}
                        <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px]" />
                      </>
                    )}
                  </button>

                  <p className="text-zinc-400 text-[10px] sm:text-[11px] text-center pt-1 sm:pt-2">
                    Your info is safe with us. We'll never spam you. {isAudit ? "Audit delivered in 48 hours." : isQuotation ? "Quote delivered in 24 hours." : "NDA available on request."}
                  </p>
                </form>
              </div>
            ) : (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-8 sm:p-10 md:p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${isAudit ? "bg-emerald-400/10" : isQuotation ? "bg-blue-400/10" : "bg-white/10"} flex items-center justify-center mx-auto mb-5 sm:mb-6`}
                >
                  <CheckCircle2 size={32} className={`sm:w-9 sm:h-9 ${benefitIconColor}`} />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  {isAudit ? "Audit request received!" : isQuotation ? "Quote request received!" : "Request sent successfully!"}
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base font-light max-w-md mx-auto mb-2 sm:mb-3">
                  {isAudit
                    ? "We're analyzing your digital presence. Your custom audit report will land in your inbox within 48 hours."
                    : isQuotation
                      ? "We're preparing your custom quote. Our team will email you a detailed cost breakdown and timeline within 24 hours."
                      : "Our senior engineer will personally review your vision and reach out within 24 hours to discuss your custom demo."}
                </p>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-8 sm:mb-10">
                  Check your email at <span className="text-white font-medium">{formData.email}</span> for a confirmation.
                </p>

                <button
                  onClick={onClose}
                  className="h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs sm:text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
