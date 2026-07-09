import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import WhatsAppFloat from "./WhatsAppFloat";

export default function Footer({ hideWhatsApp = false }: { hideWhatsApp?: boolean }) {
  return (
    <>
      {!hideWhatsApp && <WhatsAppFloat />}
      <footer className="bg-[#120c0a] text-[#fffdfa] border-t-2 border-[#d4af37]/30 pt-16 pb-8 text-xs font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-stone-800">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img 
              src="https://cdn.shopify.com/s/files/1/0616/9100/2968/files/Logo_peach_1.png?v=1728278097"
              alt="Peach Petals Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-serif font-bold text-lg tracking-widest uppercase text-white">Peach Petals</span>
          </div>
          <p className="text-stone-400 leading-relaxed text-xs">
            Where timeless heritage meets modern silhouettes. Handcrafted ethnic traditional women's wear, kurtis, gowns, and lehengas tailored exclusively for you.
          </p>
          <p className="text-[#d4af37] text-[10px] uppercase tracking-widest font-bold">
            ESTEEMED COUTURE LABEL
          </p>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-widest">Our Collections</h4>
          <ul className="space-y-2 text-stone-400">
            <li><Link href="/kurtis" className="hover:text-white transition-colors">V-Neck Cotton Kurtis</Link></li>
            <li><Link href="/gowns" className="hover:text-white transition-colors">Flared Silk Gowns</Link></li>
            <li><Link href="/lehengas" className="hover:text-white transition-colors">Lavender & Organza Lehengas</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Banarasi Peplum Sets</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Summer 2025 Lookbook</Link></li>
          </ul>
        </div>

        {/* Client Lounge */}
        <div>
          <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-widest">Client Lounge</h4>
          <ul className="space-y-2 text-stone-400">
            <li><Link href="/#sizing-lab" className="hover:text-white transition-colors">3D Digital Sizing Lab</Link></li>
            <li><Link href="/#stylist" className="hover:text-white transition-colors">Personal Sizing Consultation</Link></li>
            <li><button className="hover:text-white transition-colors text-left">Returns & Replacements</button></li>
            <li><button className="hover:text-white transition-colors text-left">Our Environmental Promise</button></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-widest">Contact Atelier</h4>
          <ul className="space-y-2 text-stone-400">
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#d4af37]" /> +91 805-1426-888
            </li>
            <li>boutique@peachpetals.in</li>
            <li>custom@peachpetals.in</li>
            <li className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Headquarters</span>
              <span className="text-white">Jaipur, Rajasthan, India</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[10px] tracking-wider uppercase">
        <p>© 2026 PEACH PETALS LUXURY. ALL WORLDWIDE DESIGN PATENTS REGISTERED.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <button className="hover:text-white transition-colors text-left">Privacy Code</button>
          <button className="hover:text-white transition-colors text-left">Terms of Patronage</button>
          <button className="hover:text-white transition-colors text-left">Digital Sizing Standards</button>
        </div>
      </div>
    </footer>
    </>
  );
}
