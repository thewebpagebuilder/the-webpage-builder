import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Visit Us</span>
          <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">We Would Love to See You</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Conveniently located near Madhur Sweets on Dindori Road, Nashik.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-start gap-4 rounded-2xl bg-amber-50 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600"><MapPin className="h-5 w-5" /></div>
              <div><p className="font-bold text-black">Address</p><p className="text-sm text-slate-600">Shiv Plaza, Shop No. 5 & 105, Dindori Road, Near Madhur Sweets, Nashik, Maharashtra 422004</p></div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-amber-50 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600"><Phone className="h-5 w-5" /></div>
              <div><p className="font-bold text-black">Phone</p><a href="tel:+917498444051" className="text-sm font-medium text-amber-600 hover:underline">+91 74984 44051</a></div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-amber-50 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600"><Mail className="h-5 w-5" /></div>
              <div><p className="font-bold text-black">Email</p><a href="mailto:contact@dragrawals.com" className="text-sm font-medium text-amber-600 hover:underline">contact@dragrawals.com</a></div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-amber-50 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600"><Clock className="h-5 w-5" /></div>
              <div><p className="font-bold text-black">Working Hours</p><p className="text-sm text-slate-600">Mon – Sat: 10:00 AM – 8:30 PM<br />Sunday: 10:00 AM – 2:00 PM</p></div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg lg:col-span-2">
            <iframe title="Dr. Agrawal's Dental Clinic Location" src="https://www.openstreetmap.org/export/embed.html?bbox=73.76%2C19.99%2C73.82%2C20.03&layer=mapnik&marker=20.0123%2C73.7891" width="100%" style={{ border: 0, minHeight: "400px" }} allowFullScreen loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
