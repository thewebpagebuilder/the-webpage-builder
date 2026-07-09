"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Sparkles, Filter, Search, X } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import WhatsAppFloat from "@/app/components/WhatsAppFloat";
import { getProducts } from "@/app/actions";

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

export default function ShopPageClient({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOccasion, setSelectedOccasion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const filtered = await getProducts(selectedCategory, selectedOccasion, searchQuery);
      setProducts(filtered);
    });
  }, [selectedCategory, selectedOccasion, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fffdfa]">
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#fff5f0] to-[#fffdfa] border-b border-[#d4af37]/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#a0684f] font-bold">The Complete Atelier</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-[#1c120e] mt-2">All Collections</h1>
          <p className="text-stone-500 text-sm mt-3 max-w-xl mx-auto">
            Browse our entire range of handcrafted kurtis, designer lehengas, flared anarkali gowns, and premium salwar suits.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-[73px] z-30 bg-[#fffdfa]/95 backdrop-blur-md border-b border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {[
                { id: "all", label: "All" },
                { id: "kurti", label: "Kurtis" },
                { id: "gown", label: "Gowns" },
                { id: "lehenga", label: "Lehengas" },
                { id: "salwar-suit", label: "Salwar Suits" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                    selectedCategory === tab.id 
                      ? 'bg-[#1c120e] text-[#fffdfa] shadow-md' 
                      : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Occasion & Search */}
            <div className="flex items-center gap-2 ml-auto w-full md:w-auto">
              <div className="flex items-center gap-1 text-xs font-medium text-stone-500 whitespace-nowrap">
                <Filter className="h-3.5 w-3.5 text-[#d4af37]" />
                {["all", "wedding", "festive", "casual"].map(occ => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                      selectedOccasion === occ ? 'bg-[#fbe7df] text-[#8a5a44] font-bold' : 'hover:text-stone-900'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text" placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-full border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8a5a44] text-xs w-40 sm:w-56"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="h-3 w-3 text-stone-400 hover:text-stone-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isPending ? (
          <div className="py-24 text-center">
            <div className="inline-block w-8 h-8 border-4 border-t-[#d4af37] border-stone-300 rounded-full animate-spin"></div>
            <p className="text-stone-500 text-xs uppercase tracking-widest mt-4">Curating your collection...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center bg-stone-50 rounded-3xl border border-stone-200">
            <p className="text-stone-500 font-serif text-lg">No products match your filter selection.</p>
            <button 
              onClick={() => { setSelectedCategory("all"); setSelectedOccasion("all"); setSearchQuery(""); }}
              className="mt-4 px-6 py-2.5 bg-[#1c120e] text-[#fffdfa] rounded-full text-xs uppercase tracking-wider font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-stone-400 mb-6">
              Showing <span className="font-bold text-stone-700">{products.length}</span> exquisite designs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>

      <Footer hideWhatsApp={true} />
      <WhatsAppFloat />
    </div>
  );
}
