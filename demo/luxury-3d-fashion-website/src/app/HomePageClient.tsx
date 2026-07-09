"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  ChevronRight,
  Video,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import WhatsAppFloat from "@/app/components/WhatsAppFloat";
import SizingLab3D from "@/app/components/SizingLab3D";
import { bookVideoCall } from "@/app/actions";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number | null;
  image: string;
  fabric: string | null;
  work: string | null;
  occasion: string | null;
  rating: number | null;
  reviewsCount: number | null;
  sizes: string[] | null;
  colors: string[] | null;
  featured: boolean | null;
}

export default function HomePageClient({ 
  allProducts, 
  featuredProducts 
}: { 
  allProducts: (Product & { images?: string[] | null; createdAt?: Date | null })[]; 
  featuredProducts: (Product & { images?: string[] | null; createdAt?: Date | null })[];
}) {
  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const heroProducts = featuredProducts.slice(0, 4);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: "stylist", text: "Welcome to Peach Petals Golden Lounge. I am your Luxury Sizing & Couture Advisor. How may I assist you in finding your dream outfit today?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Video Consult State
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [videoForm, setVideoForm] = useState({ name: "", email: "", phone: "", date: "", timeSlot: "11:00 AM - 12:00 PM" });
  const [videoSuccess, setVideoSuccess] = useState(false);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    const updated = [...chatMessages, { sender: "user", text: userText }];
    setChatMessages(updated);
    setChatInput("");

    setTimeout(() => {
      let botText = "I would love to help you customize your order. Would you like me to book a complimentary Video Consultation for you?";
      const lower = chatInput.toLowerCase();
      if (lower.includes("fabric") || lower.includes("summer") || lower.includes("cotton")) {
        botText = "Peach Petals' summer favorites are crafted in premium Cotton Silk and Viscose Silk - 100% cooling air flow! Our 'Teal Blossom Set' is particularly loved for hot afternoon events.";
      } else if (lower.includes("sangeet") || lower.includes("wedding") || lower.includes("lehenga")) {
        botText = "For grand occasions, our 'Lavender & Pista Indo-Western Lehenga Choli' (₹14,090) is unparalleled. Hand-cut mirrors, zardosi embroidery, majestic flowy silhouette.";
      } else if (lower.includes("size") || lower.includes("measure") || lower.includes("fit")) {
        botText = "Sizing with Peach Petals is effortless! Use our 3D Virtual Fitting Room above - drag to rotate 360°, adjust 7 body measurements, and we'll match you XS to 4XL with free bespoke tailoring!";
      } else if (lower.includes("delivery") || lower.includes("ship")) {
        botText = "We dispatch all orders within 2 business days in our signature fully recyclable biodegradable boxes. Shipping 7-10 business days globally. FREE custom tailoring!";
      }
      setChatMessages(prev => [...prev, { sender: "stylist", text: botText }]);
    }, 700);
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await bookVideoCall({
      customerName: videoForm.name,
      customerEmail: videoForm.email,
      phone: videoForm.phone,
      date: videoForm.date,
      timeSlot: videoForm.timeSlot,
      productTitle: "General Browsing",
    });
    if (result.success) {
      setVideoSuccess(true);
      setTimeout(() => {
        setIsConsultOpen(false);
        setVideoSuccess(false);
        setVideoForm({ name: "", email: "", phone: "", date: "", timeSlot: "11:00 AM - 12:00 PM" });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-900 font-sans selection:bg-[#f6dcd0] selection:text-[#8a5a44] overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section id="hero" className="relative py-12 lg:py-24 overflow-hidden bg-gradient-to-b from-[#fff5f0] to-[#fffdfa] border-b border-[#d4af37]/10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#ffe3d1]/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#fff5eb]/50 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#fdf2ee] border border-[#f3d9ce] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#a0684f] w-max mx-auto lg:mx-0 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
              Est. 2025 • Masterful Indian Tailoring
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-normal text-[#1c120e] leading-[1.1] tracking-tight">
              Where <span className="bg-gradient-to-r from-[#8a5a44] via-[#c97d60] to-[#46120a] bg-clip-text text-transparent italic font-medium">Bespoke</span> Elegance <br/>Meets Tradition
            </h1>
            <p className="mt-6 text-stone-600 text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Indulge in carefully curated lightweight Kurtis, royal flowy Gowns, and majestic Lehengas. 
              Handcrafted in breathable cotton, premium viscose, and Banarasi silks – with FREE custom tailoring.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link 
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-[#1c120e] hover:bg-[#33221b] text-[#fffdfa] text-center rounded-full font-serif font-semibold tracking-widest uppercase transition-all shadow-xl hover:shadow-[#1c120e]/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 text-[#d4af37]" />
              </Link>
              <Link 
                href="/shop"
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-stone-50 text-stone-900 border border-[#d4af37]/30 text-center rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                View All Products
                <ChevronRight className="h-4 w-4 text-[#d4af37]" />
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#d4af37]/20 pt-8 max-w-md mx-auto lg:mx-0">
              <div><p className="text-2xl font-serif font-bold text-stone-900">100%</p><p className="text-xs text-stone-500 uppercase tracking-wider mt-1">Bespoke Fits</p></div>
              <div><p className="text-2xl font-serif font-bold text-stone-900">Pure</p><p className="text-xs text-stone-500 uppercase tracking-wider mt-1">Silk & Cotton</p></div>
              <div><p className="text-2xl font-serif font-bold text-stone-900">2-Day</p><p className="text-xs text-stone-500 uppercase tracking-wider mt-1">Dispatch</p></div>
            </div>
          </div>

          {/* 3D Showcase */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center py-6">
              <div className="absolute bottom-4 w-72 h-8 bg-stone-900/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="absolute bottom-8 w-80 h-80 rounded-full border border-dashed border-[#d4af37]/40 animate-spin pointer-events-none" style={{ animationDuration: '30s' }}></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroActiveIndex}
                  initial={{ opacity: 0, rotateY: -80, scale: 0.8 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 80, scale: 0.8 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="relative w-72 sm:w-80 h-[460px] bg-white rounded-3xl border-2 border-[#d4af37]/30 shadow-[0_30px_70px_rgba(28,18,14,0.18)] overflow-hidden group"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#d4af37] via-[#fff] to-[#aa7c11] z-10"></div>
                  <Link href={`/shop/${heroProducts[heroActiveIndex]?.id}`} className="absolute inset-0 bg-[#fffdfa] flex flex-col justify-between">
                    <div className="relative w-full h-[320px] bg-[#fff] overflow-hidden flex items-center justify-center p-2">
                      {heroProducts[heroActiveIndex] && (
                        <img 
                          src={heroProducts[heroActiveIndex].image} 
                          alt={heroProducts[heroActiveIndex].name}
                          className="w-full h-full object-contain block bg-transparent"
                        />
                      )}
                      <span className="absolute top-4 right-4 bg-[#1c120e]/95 backdrop-blur-md text-[#d4af37] px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        PREMIUM DESIGN
                      </span>
                    </div>
                    <div className="p-5 border-t border-[#d4af37]/10 bg-gradient-to-t from-[#fffaf7] to-white relative">
                      <span className="text-[10px] font-bold tracking-widest text-[#a0684f] uppercase block">
                        {heroProducts[heroActiveIndex]?.category} • {heroProducts[heroActiveIndex]?.fabric}
                      </span>
                      <h3 className="text-base font-serif font-bold text-stone-900 line-clamp-1 mt-1">
                        {heroProducts[heroActiveIndex]?.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-serif font-bold text-[#8a5a44]">
                          Rs. {heroProducts[heroActiveIndex]?.price?.toLocaleString()}
                        </span>
                        {heroProducts[heroActiveIndex]?.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            Rs. {heroProducts[heroActiveIndex]?.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
              <button 
                onClick={() => setHeroActiveIndex((heroActiveIndex - 1 + heroProducts.length) % heroProducts.length)}
                className="absolute left-0 sm:-left-4 bg-white/90 hover:bg-white text-stone-900 border border-[#d4af37]/40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all z-20"
              >
                <ChevronRight className="h-5 w-5 transform rotate-180 text-[#8a5a44]" />
              </button>
              <button 
                onClick={() => setHeroActiveIndex((heroActiveIndex + 1) % heroProducts.length)}
                className="absolute right-0 sm:-right-4 bg-white/90 hover:bg-white text-stone-900 border border-[#d4af37]/40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all z-20"
              >
                <ChevronRight className="h-5 w-5 text-[#8a5a44]" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              {heroProducts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setHeroActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${heroActiveIndex === idx ? 'bg-[#d4af37] scale-125' : 'bg-stone-300 hover:bg-[#a0684f]'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#a0684f] font-bold block mb-2">CURATED FOR EXQUISITE TASTE</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1c120e]">Featured Masterpieces</h2>
            <p className="text-stone-500 text-sm mt-2 max-w-xl">Our most coveted designs — handpicked for extraordinary craftsmanship.</p>
          </div>
          <Link 
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1c120e] hover:bg-[#a0684f] text-[#fffdfa] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            View All Products <ArrowRight className="h-4 w-4 text-[#d4af37]" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-[#fdf9f5] border-y border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1c120e]">Shop by Collection</h2>
            <p className="text-stone-500 text-sm mt-2">Discover the perfect silhouette for every occasion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { href: "/kurtis", title: "Kurtis & Palazzo Sets", desc: "Everyday elegance in cotton, viscose & silk", img: "https://peachpetals.in/cdn/shop/files/Azure_Blue_Floral_Print_Kurta_Set_with_Bordered_Dupatta.webp?v=1769596048&width=600", bg: "from-[#fff0e6] to-[#ffe3d1]" },
              { href: "/gowns", title: "Gowns & Anarkalis", desc: "Flared silhouettes for weddings & festivities", img: "https://peachpetals.in/cdn/shop/files/Tiered_Pastel_Anarkali_Gown_with_Embroidered_Bodice.webp?v=1771399184&width=600", bg: "from-[#f0e6ff] to-[#e8d5f5]" },
              { href: "/lehengas", title: "Lehenga Cholis", desc: "Bridal & festive grandeur with zardosi work", img: "https://peachpetals.in/cdn/shop/files/857-2489_2.webp?v=1770894040&width=600", bg: "from-[#ffe6f0] to-[#ffd1e0]" },
            ].map(c => (
              <Link key={c.href} href={c.href} className="group relative bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden hover:shadow-xl hover:border-[#d4af37]/35 transition-all duration-300">
                <div className={`h-64 bg-gradient-to-br ${c.bg} flex items-center justify-center p-4`}>
                  <img src={c.img} alt={c.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-bold text-stone-900">{c.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">{c.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-[#a0684f] group-hover:underline">
                    Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3D SIZING LAB - NEW IMPROVED VERSION */}
      <SizingLab3D products={allProducts.map(p => ({ id: p.id, name: p.name, image: p.image, category: p.category, price: p.price }))} />

      {/* STYLIST CHAT */}
      <section id="stylist" className="bg-[#fdf9f5] border-y border-[#d4af37]/20 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] text-[#a0684f] font-bold block mb-2">LIVE GOLDEN STYLIST ROOM</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-950">Interactive Fashion Advice</h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              Wondering if Georgette Anarkalis suit a beach wedding, or which kurta fabric stays crisp in humid afternoons? Our automated premium stylist is trained on classic Indian bridal aesthetics.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsConsultOpen(true)}
                className="px-6 py-3 bg-[#1c120e] hover:bg-[#a0684f] text-[#fffdfa] rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
              >
                <Video className="h-4 w-4 text-[#d4af37]" /> Book Video Consultation
              </button>
            </div>
          </div>
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#d4af37]/30 shadow-xl overflow-hidden flex flex-col h-[400px]">
            <div className="bg-[#1c120e] p-4 flex items-center gap-3 border-b border-[#d4af37]/20">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Peach Petals Stylist</span>
                <span className="text-[10px] text-stone-400">Online • Live Measurement Assistant</span>
              </div>
              <Sparkles className="h-4 w-4 text-[#d4af37] ml-auto animate-bounce" />
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50 text-xs">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#1c120e] text-white rounded-tr-none"
                      : "bg-white text-stone-800 rounded-tl-none border border-stone-200"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-stone-100 flex items-center gap-2 bg-white">
              <input
                type="text" placeholder="Ask about summer fabrics, sizer charts, sangeet dress..."
                value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#d4af37] text-xs text-stone-900"
              />
              <button onClick={handleChatSend} className="px-4 py-2.5 bg-[#1c120e] hover:bg-[#a0684f] text-[#fffdfa] rounded-xl text-xs font-bold uppercase transition-all">Send</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-serif text-[#1c120e]">Peach Petals Guidelines & Deliveries</h3>
          <p className="text-stone-500 text-xs uppercase tracking-wider mt-1">Sustainably Boxed • Tailored with Perfection</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Secure 7-Day Returns", desc: "Inspect the product carefully. If you are not fully satisfied, submit your return or replacement request within 7 days of receiving the delivery." },
            { title: "Sustainable Packaging", desc: "We ship all customized lehengas, kurtis, and gowns in our signature fully recyclable and biodegradable boxes." },
            { title: "Swift Worldwide Logistics", desc: "Orders dispatched within 2 business days. Ships within 7-10 business days with live tracking details texted directly. WhatsApp order updates included!" },
          ].map((item) => (
            <div key={item.title} className="bg-[#fffdfa] p-6 rounded-2xl border border-stone-200/80">
              <h4 className="font-serif font-bold text-stone-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span> {item.title}
              </h4>
              <p className="text-stone-600 text-xs mt-3 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Consultation Modal */}
      <AnimatePresence>
        {isConsultOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsConsultOpen(false)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#d4af37] p-6 max-w-md w-full relative z-10 shadow-2xl">
              <button onClick={() => setIsConsultOpen(false)} className="absolute top-4 right-4 bg-stone-100 hover:bg-stone-200 text-stone-800 p-1.5 rounded-full">✕</button>
              <div className="text-center mb-6">
                <Video className="h-8 w-8 text-[#d4af37] mx-auto animate-pulse" />
                <h3 className="text-xl font-serif font-black text-stone-950 mt-2">Complimentary Video Consult</h3>
                <p className="text-xs text-stone-500 mt-1">Explore real fabrics & design options with live experts.<br/>WhatsApp confirmation sent instantly!</p>
              </div>
              {videoSuccess ? (
                <div className="py-8 text-center text-stone-800 space-y-2">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="font-serif font-bold text-lg">Booking Confirmed!</h4>
                  <p className="text-xs">We have scheduled your call. Google Meet + WhatsApp invitation sent to your inbox.</p>
                </div>
              ) : (
                <form onSubmit={handleVideoSubmit} className="space-y-4 text-xs">
                  {[
                    { label: "Your Full Name", type: "text", placeholder: "E.g., Anjali Sharma", key: "name" as const },
                    { label: "Email Address", type: "email", placeholder: "anjali@gmail.com", key: "email" as const },
                    { label: "WhatsApp Phone Number", type: "text", placeholder: "+91 99999 77777", key: "phone" as const },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block font-semibold mb-1 text-stone-800">{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        value={videoForm[f.key]}
                        onChange={(e) => setVideoForm({ ...videoForm, [f.key]: e.target.value })}
                        className="w-full p-2.5 border border-stone-200 rounded-lg text-xs" />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold mb-1 text-stone-800">Preferred Date</label>
                      <input type="date" required value={videoForm.date}
                        onChange={(e) => setVideoForm({ ...videoForm, date: e.target.value })}
                        className="w-full p-2.5 border border-stone-200 rounded-lg text-xs" />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-stone-800">Time Slot</label>
                      <select value={videoForm.timeSlot}
                        onChange={(e) => setVideoForm({ ...videoForm, timeSlot: e.target.value })}
                        className="w-full p-2.5 border border-stone-200 rounded-lg text-xs bg-white">
                        <option>10:00 AM - 11:00 AM</option>
                        <option>11:00 AM - 12:00 PM</option>
                        <option>02:00 PM - 03:00 PM</option>
                        <option>04:00 PM - 05:00 PM</option>
                        <option>06:00 PM - 07:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full mt-2 py-3 bg-[#1c120e] hover:bg-[#a0684f] text-[#fffdfa] rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
                    Confirm Live Schedule
                  </button>
                  <p className="text-[10px] text-center text-stone-400">You'll receive WhatsApp + Email confirmation instantly</p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer hideWhatsApp={false} />
      <WhatsAppFloat />
    </div>
  );
}
