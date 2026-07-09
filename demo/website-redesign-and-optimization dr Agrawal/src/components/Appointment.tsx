import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, Stethoscope, MessageSquare, CheckCircle, Send } from "lucide-react";

const services = ["General Check-up / Cleaning", "Root Canal Treatment", "Dental Implants", "Invisible Aligners", "Teeth Whitening", "Cosmetic Dentistry", "Pediatric Dentistry", "Gum Treatment", "Crowns & Bridges", "Oral Surgery", "Other"];
const timeSlots = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"];

export default function Appointment() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", time: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) newErrors.phone = "Enter a valid 10-digit mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.service) newErrors.service = "Please select a service";
    if (!form.date) newErrors.date = "Please pick a date";
    if (!form.time) newErrors.time = "Please pick a time slot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const text = encodeURIComponent(`Hello Dr. Agrawal's Dental Clinic, I would like to book an appointment.%0A%0A*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Email:* ${form.email || "N/A"}%0A*Service:* ${form.service}%0A*Preferred Date:* ${form.date}%0A*Preferred Time:* ${form.time}%0A*Message:* ${form.message || "N/A"}`);
    window.open(`https://wa.me/917498444051?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="book" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Book Appointment</span>
            <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Book Your Visit in 60 Seconds</h2>
            <p className="mt-4 text-slate-600">Fill the form and we will confirm your slot instantly via WhatsApp.</p>
            <div className="mt-8 space-y-5 rounded-3xl bg-amber-50 p-6">
              <div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600"><Calendar className="h-5 w-5" /></div><div><p className="font-bold text-black">Flexible Timings</p><p className="text-sm text-slate-600">Mon – Sat: 10 AM – 8:30 PM<br />Sunday: 10 AM – 2 PM</p></div></div>
              <div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600"><Phone className="h-5 w-5" /></div><div><p className="font-bold text-black">Need help?</p><a href="tel:+917498444051" className="text-sm font-medium text-amber-600 hover:underline">+91 74984 44051</a></div></div>
              <div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600"><CheckCircle className="h-5 w-5" /></div><div><p className="font-bold text-black">Instant Confirmation</p><p className="text-sm text-slate-600">Your request is sent directly to our clinic WhatsApp.</p></div></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-amber-50 p-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600"><CheckCircle className="h-8 w-8" /></div>
                <h3 className="font-display text-2xl font-bold text-black">Request Sent!</h3>
                <p className="mt-2 text-slate-600">We have opened WhatsApp with your details. Send the message and our team will confirm your appointment shortly.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", date: "", time: "", message: "" }); }} className="mt-6 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600">Book Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-amber-200/50 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label className="mb-1 block text-sm font-medium text-black">Full Name *</label><div className="relative"><User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div>{errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}</div>
                  <div><label className="mb-1 block text-sm font-medium text-black">Mobile Number *</label><div className="relative"><Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98765 43210" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div>{errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}</div>
                  <div><label className="mb-1 block text-sm font-medium text-black">Email (optional)</label><div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div>{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}</div>
                  <div><label className="mb-1 block text-sm font-medium text-black">Service Needed *</label><div className="relative"><Stethoscope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"><option value="">Select a service</option>{services.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>{errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}</div>
                  <div><label className="mb-1 block text-sm font-medium text-black">Preferred Date *</label><div className="relative"><Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="date" min={today} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div>{errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}</div>
                  <div><label className="mb-1 block text-sm font-medium text-black">Preferred Time *</label><div className="relative"><Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"><option value="">Select time</option>{timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>{errors.time && <p className="mt-1 text-xs text-red-500">{errors.time}</p>}</div>
                </div>
                <div className="mt-5"><label className="mb-1 block text-sm font-medium text-black">Message (optional)</label><div className="relative"><MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} placeholder="Tell us about your concern..." className="w-full resize-none rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div></div>
                <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:from-amber-600 hover:to-yellow-600 sm:w-auto sm:px-10"><Send className="h-4 w-4" /> Confirm on WhatsApp</button>
                <p className="mt-3 text-xs text-slate-500">By booking, you agree to our terms and allow us to contact you.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
