"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ShoppingBag, Video, Scissors, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isCRM = pathname.startsWith("/crm");

  if (isCRM) return null;

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1c120e] text-[#f7e1d5] text-xs py-2 px-4 text-center font-medium tracking-widest relative overflow-hidden">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#d4af37] animate-pulse" />
          ESTEEMED WOMEN'S COUTURE • COMPLIMENTARY CUSTOM SIZING ON ALL LAUNCH ORDERS
          <Sparkles className="h-3.5 w-3.5 text-[#d4af37] animate-pulse" />
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#fffdfa]/85 backdrop-blur-md border-b border-[#d4af37]/20 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative p-1.5 rounded-full border border-[#d4af37]/30 bg-[#fffdfa] shadow-inner transition-transform duration-500 group-hover:rotate-12">
              <img 
                src="https://cdn.shopify.com/s/files/1/0616/9100/2968/files/Logo_peach_1.png?v=1728278097"
                alt="Peach Petals Logo"
                className="h-11 w-11 object-contain block bg-transparent"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-semibold tracking-widest uppercase text-stone-950 group-hover:text-[#a0684f] transition-colors">
                Peach Petals
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37] -mt-1 font-semibold">
                Luxurious Traditional Wear
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-stone-700">
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "All Collections" },
              { href: "/kurtis", label: "Kurtis" },
              { href: "/gowns", label: "Gowns & Anarkalis" },
              { href: "/lehengas", label: "Lehengas" },
            ].map(link => (
              <Link 
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition-colors ${pathname === link.href || pathname.startsWith(link.href + "/") ? "text-[#a0684f] bg-[#fdf2ee]" : "hover:text-[#a0684f] hover:bg-stone-50"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/#sizing-lab"
              className="px-3 py-2 rounded-full bg-[#fdf2ee] text-[#8a5a44] border border-[#f3d9ce] hover:bg-[#fbe7df] transition-colors flex items-center gap-1.5"
            >
              <Scissors className="h-3.5 w-3.5 text-[#d4af37]" />
              3D Sizing Lab
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/#stylist"
              className="text-stone-800 hover:text-[#a0684f] p-1.5 relative transition-transform hover:scale-110 flex items-center gap-1 text-xs border border-[#d4af37]/30 bg-[#fff] rounded-full px-3 py-1.5"
            >
              <Video className="h-4 w-4 text-[#d4af37]" />
              <span className="hidden sm:inline font-semibold">Live Consult</span>
            </Link>
            <Link 
              href="/shop"
              className="bg-[#1c120e] hover:bg-[#a0684f] text-[#fffdfa] p-2.5 rounded-full relative transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4 text-[#d4af37]" />
              <span className="text-xs font-serif font-semibold pr-1">Shop</span>
            </Link>
            <Link
              href="/crm"
              className="text-[10px] font-bold uppercase tracking-wider text-[#a0684f] hover:text-[#1c120e] flex items-center gap-1"
              title="CRM Login"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="hidden md:inline">CRM</span>
            </Link>
          </div>
        </div>

        <div className="lg:hidden border-t border-stone-100 px-4 py-2 flex items-center gap-1 overflow-x-auto text-xs font-medium">
          <Link href="/" className={`px-3 py-1.5 rounded-full whitespace-nowrap ${pathname === "/" ? "bg-[#1c120e] text-white" : "bg-stone-100 text-stone-700"}`}>Home</Link>
          <Link href="/shop" className={`px-3 py-1.5 rounded-full whitespace-nowrap ${pathname.startsWith("/shop") ? "bg-[#1c120e] text-white" : "bg-stone-100 text-stone-700"}`}>All</Link>
          <Link href="/kurtis" className={`px-3 py-1.5 rounded-full whitespace-nowrap ${pathname === "/kurtis" ? "bg-[#1c120e] text-white" : "bg-stone-100 text-stone-700"}`}>Kurtis</Link>
          <Link href="/gowns" className={`px-3 py-1.5 rounded-full whitespace-nowrap ${pathname === "/gowns" ? "bg-[#1c120e] text-white" : "bg-stone-100 text-stone-700"}`}>Gowns</Link>
          <Link href="/lehengas" className={`px-3 py-1.5 rounded-full whitespace-nowrap ${pathname === "/lehengas" ? "bg-[#1c120e] text-white" : "bg-stone-100 text-stone-700"}`}>Lehengas</Link>
        </div>
      </header>
    </>
  );
}
