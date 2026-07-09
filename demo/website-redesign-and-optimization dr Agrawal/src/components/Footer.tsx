import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Heart } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
}
function InstagramIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
}
function YoutubeIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
}

export default function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Untitled%20(11%20%C3%97%2021cm).png" alt="Dr. Agrawal's Logo" className="h-12 w-auto rounded-lg bg-white object-contain p-1 shadow-sm" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div><span className="block font-display text-lg font-bold text-black">Dr. Agrawal's</span><span className="block text-[10px] font-medium uppercase tracking-wider text-amber-600">Dental Clinic</span></div>
            </div>
            <p className="mb-4 text-sm leading-relaxed">Nashik's trusted destination for painless, precise and personalised dental care.</p>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-black transition hover:bg-amber-500 hover:text-black"><FacebookIcon className="h-4 w-4" /></a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-black transition hover:bg-amber-500 hover:text-black"><InstagramIcon className="h-4 w-4" /></a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-black transition hover:bg-amber-500 hover:text-black"><YoutubeIcon className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-display font-bold text-black">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/" className="transition hover:text-amber-400">Home</a></li>
              <li><a href="#/services" className="transition hover:text-amber-400">Services</a></li>
              <li><a href="#/about" className="transition hover:text-amber-400">About Us</a></li>
              <li><a href="#/gallery" className="transition hover:text-amber-400">Smile Gallery</a></li>
              <li><a href="#/book" className="transition hover:text-amber-400">Book Appointment</a></li>
              <li><a href="#/contact" className="transition hover:text-amber-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-display font-bold text-black">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />Shiv Plaza, Shop 5 & 105, Dindori Rd, Nashik 422004</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-amber-400" /><a href="tel:+917498444051" className="hover:text-amber-400">+91 74984 44051</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-amber-400" /><a href="mailto:contact@dragrawals.com" className="hover:text-amber-400">contact@dragrawals.com</a></li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />Mon – Sat: 10 AM – 8:30 PM<br />Sunday: 10 AM – 2 PM</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-display font-bold text-black">Newsletter</h4>
            <p className="mb-3 text-sm">Subscribe for oral health tips, offers and clinic updates.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert(`Thank you for subscribing with ${email}`); setEmail(""); }} className="flex gap-2">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-black outline-none transition focus:border-amber-500" />
              <button type="submit" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-black transition hover:bg-amber-600"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-amber-100 pt-6 text-center text-xs text-black/60">
          <p className="flex items-center justify-center gap-1">© {new Date().getFullYear()} Dr. Agrawal's Dental Clinic. Made with <Heart className="h-3 w-3 text-red-500" /> in Nashik.</p>
        </div>
      </div>
    </footer>
  );
}
