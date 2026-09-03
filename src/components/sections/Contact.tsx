"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/supabase";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await submitLead({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        budget: formData.budget || undefined,
        project_details: formData.message,
        lead_source: "Contact Section"
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", company: "", budget: "", message: "" });
    } catch (error) {
      console.error("Failed to submit:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background border-t border-border relative overflow-hidden" id="contact">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-3 sm:mb-4">/ Start a Project</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-5 sm:mb-6 leading-[1.05]">
              Let's build something <span className="text-primary">extraordinary.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed mb-10 max-w-md">
              Whether you need a cutting-edge web application, a scalable enterprise system, or a complete digital overhaul, our team of senior engineers is ready to execute.
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-foreground font-medium text-sm mb-1">Direct Email</h4>
                  <a href="mailto:thewebpagebuilder@gmail.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    thewebpagebuilder@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-foreground font-medium text-sm mb-1">Response Time</h4>
                  <p className="text-muted-foreground text-sm">Within 24 hours (usually faster)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-foreground flex-shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-foreground font-medium text-sm mb-1">Strict Confidentiality</h4>
                  <p className="text-muted-foreground text-sm">We sign NDAs before discussing details.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-card border border-border">
              {submitStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Request Received</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Thank you. A senior engineer will review your details and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-6 text-sm text-primary hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="name" className="text-xs font-medium text-muted-foreground uppercase tracking-wider pl-1">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-12 bg-background border border-border rounded-xl px-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider pl-1">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-12 bg-background border border-border rounded-xl px-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="company" className="text-xs font-medium text-muted-foreground uppercase tracking-wider pl-1">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full h-12 bg-background border border-border rounded-xl px-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="budget" className="text-xs font-medium text-muted-foreground uppercase tracking-wider pl-1">Budget Range</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full h-12 bg-background border border-border rounded-xl px-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                      >
                        <option value="">Select range...</option>
                        <option value="< ₹50K">Less than ₹50,000</option>
                        <option value="₹50K - ₹2L">₹50,000 - ₹2,00,000</option>
                        <option value="₹2L - ₹5L">₹2,00,000 - ₹5,00,000</option>
                        <option value="> ₹5L">₹5,00,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="message" className="text-xs font-medium text-muted-foreground uppercase tracking-wider pl-1">Project Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-xl p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your goals, timeline, and any technical requirements..."
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-destructive text-sm font-medium">Failed to submit request. Please try emailing us directly.</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
