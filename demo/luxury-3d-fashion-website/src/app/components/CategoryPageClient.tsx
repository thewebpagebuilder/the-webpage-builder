"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import WhatsAppFloat from "@/app/components/WhatsAppFloat";

interface Product {
  id: number; name: string; description: string; category: string;
  price: number; originalPrice: number | null; image: string;
  fabric: string | null; work: string | null; occasion: string | null;
  rating: number | null; reviewsCount: number | null;
  sizes: string[] | null; colors: string[] | null; featured: boolean | null;
}

export default function CategoryPageClient({
  products, title, subtitle, category, heroImage
}: {
  products: Product[];
  title: string;
  subtitle: string;
  category: string;
  heroImage: string;
}) {
  return (
    <div className="min-h-screen bg-[#fffdfa]">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#fff5f0] to-[#fffdfa] border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#a0684f] font-bold">
                {category} Collection
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-normal text-[#1c120e] mt-2 leading-tight">
                {title}
              </h1>
              <p className="text-stone-500 text-sm sm:text-base mt-4 max-w-lg leading-relaxed">
                {subtitle}
              </p>
              <div className="flex items-center gap-3 mt-6">
                <Link href="/shop" className="px-6 py-3 bg-[#1c120e] hover:bg-[#a0684f] text-[#fffdfa] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2">
                  View All Products <ArrowRight className="h-4 w-4 text-[#d4af37]" />
                </Link>
                <Link href="/#sizing-lab" className="px-6 py-3 border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 rounded-full text-xs font-bold uppercase tracking-wider transition-all">
                  Try Sizing Lab
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-72 sm:w-96 h-80 sm:h-96 bg-white rounded-3xl border-2 border-[#d4af37]/20 shadow-xl flex items-center justify-center p-4 overflow-hidden">
                <img src={heroImage} alt={title} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-stone-500 font-serif text-lg">No products in this category yet.</p>
            <Link href="/shop" className="mt-4 inline-block px-6 py-2.5 bg-[#1c120e] text-[#fffdfa] rounded-full text-xs uppercase tracking-wider font-semibold">
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <p className="text-xs text-stone-400 mb-6">
              Showing <span className="font-bold text-stone-700">{products.length}</span> exquisite {category} designs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Sizing CTA */}
      <section className="py-12 bg-[#fdf9f5] border-y border-[#d4af37]/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-xl font-serif font-bold text-[#1c120e]">Not sure about your size?</h3>
          <p className="text-stone-500 text-sm mt-2">Use our 3D Sizing Lab to get your exact measurements matched to Peach Petals official size charts.</p>
          <Link href="/#sizing-lab" className="mt-5 inline-flex items-center gap-2 px-6 py-3 bg-[#1c120e] hover:bg-[#a0684f] text-[#fffdfa] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md">
            Open Sizing Lab <ArrowRight className="h-4 w-4 text-[#d4af37]" />
          </Link>
        </div>
      </section>

      <Footer hideWhatsApp={true} />
      <WhatsAppFloat />
    </div>
  );
}
