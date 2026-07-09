"use client";

import React from "react";
import Link from "next/link";
import { Star, Maximize2, Video } from "lucide-react";

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

export default function ProductCard({ product }: { product: Product }) {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:border-[#d4af37]/35 relative">
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-[#e05a47] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-md">
          SAVE {discountPercent}%
        </div>
      )}

      {/* Image */}
      <Link href={`/shop/${product.id}`} className="relative w-full h-[340px] bg-[#fff] overflow-hidden flex items-center justify-center p-2 cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain block bg-transparent"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#1c120e]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 backdrop-blur-md text-stone-900 border border-[#d4af37]/40 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all">
            <Maximize2 className="h-3.5 w-3.5 text-[#d4af37]" /> View Details
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 border-t border-stone-100 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-amber-500 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < (product.rating || 5) ? "fill-current" : "opacity-30"}`} />
            ))}
            <span className="text-[10px] text-stone-400 font-bold ml-1">({product.reviewsCount || 12})</span>
          </div>

          <Link href={`/shop/${product.id}`} className="font-serif text-base font-bold text-stone-950 line-clamp-1 hover:text-[#a0684f] transition-colors">
            {product.name}
          </Link>

          <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1 flex-wrap">
            <span className="bg-[#f6eae1] text-[#8a5a44] px-2 py-0.5 rounded font-semibold">{product.fabric}</span>
            <span className="truncate">• {product.work}</span>
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-serif font-black text-[#1c120e]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-1.5">
            <Link
              href={`/shop/${product.id}`}
              className="p-2 border border-stone-200 hover:border-[#d4af37]/60 hover:bg-stone-50 text-[#8a5a44] rounded-full transition-all"
              title="View Details"
            >
              <Video className="h-4 w-4" />
            </Link>
            <Link
              href={`/shop/${product.id}`}
              className="px-4 py-2 bg-[#1c120e] hover:bg-[#a0684f] text-[#fffdfa] text-xs font-bold rounded-full uppercase tracking-wider transition-all"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
