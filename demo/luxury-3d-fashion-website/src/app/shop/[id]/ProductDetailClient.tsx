"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Star, ShoppingBag, Scissors, Video, Info, CheckCircle2, 
  ArrowLeft, ChevronRight, X, Check 
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import WhatsAppFloat from "@/app/components/WhatsAppFloat";
import { bookVideoCall, placeCustomOrder, addReview } from "@/app/actions";

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

interface Review {
  id: number;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: Date | null;
}

export default function ProductDetailClient({
  product,
  initialReviews,
  relatedProducts,
}: {
  product: Product;
  initialReviews: Review[];
  relatedProducts: Product[];
}) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [videoForm, setVideoForm] = useState({ name: "", email: "", phone: "", date: "", timeSlot: "11:00 AM - 12:00 PM" });
  const [videoSuccess, setVideoSuccess] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await bookVideoCall({
      customerName: videoForm.name,
      customerEmail: videoForm.email,
      phone: videoForm.phone,
      date: videoForm.date,
      timeSlot: videoForm.timeSlot,
      productId: product.id,
      productTitle: product.name,
    });
    if (result.success) {
      setVideoSuccess(true);
      setTimeout(() => {
        setShowVideoForm(false);
        setVideoSuccess(false);
      }, 3000);
    }
  };

  const handleAddToCart = async () => {
    await placeCustomOrder({
      customerName: "Storefront Patron",
      customerEmail: "client@peachpetals.in",
      phone: "+91",
      productTitle: `${product.name}`,
      pricePaid: product.price,
      productId: product.id,
      size: selectedSize,
      quantity: 1,
      bust: "Standard",
      waist: "Standard",
      hips: "Standard",
      shoulder: "Standard",
      height: "Standard",
      customNotes: `Direct purchase via product page. Size: ${selectedSize}`,
    });
    setAddToCartSuccess(true);
    setTimeout(() => setAddToCartSuccess(false), 3000);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addReview({
      productId: product.id,
      productName: product.name,
      reviewerName: reviewForm.name || "Valued Client",
      rating: reviewForm.rating,
      comment: reviewForm.comment,
    });
    if (result.success) {
      setReviews([{
        id: Date.now(),
        reviewerName: reviewForm.name || "Valued Client",
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        createdAt: new Date(),
      }, ...reviews]);
      setReviewSuccess(true);
      setReviewForm({ name: "", rating: 5, comment: "" });
      setTimeout(() => setReviewSuccess(false), 3000);
    }
  };

  const sizeChart = [
    { size: "XS", bust: "34.25\"", waist: "27\"", hip: "45\"", shoulder: "14\"", length: "44\"" },
    { size: "S", bust: "37\"", waist: "29\"", hip: "46.25\"", shoulder: "14.25\"", length: "44\"" },
    { size: "M", bust: "39.25\"", waist: "31\"", hip: "48\"", shoulder: "14.5\"", length: "44\"" },
    { size: "L", bust: "41\"", waist: "33\"", hip: "50\"", shoulder: "15\"", length: "44\"" },
    { size: "XL", bust: "42.5\"", waist: "35\"", hip: "52\"", shoulder: "15.5\"", length: "44\"" },
    { size: "XXL", bust: "44\"", waist: "38.5\"", hip: "54\"", shoulder: "16\"", length: "44\"" },
    { size: "3XL", bust: "49\"", waist: "42\"", hip: "57\"", shoulder: "16.5\"", length: "44\"" },
    { size: "4XL", bust: "52\"", waist: "46\"", hip: "60\"", shoulder: "17.5\"", length: "44\"" },
  ];

  return (
    <div className="min-h-screen bg-[#fffdfa]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-[#a0684f] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-[#a0684f] transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/${product.category === "kurti" ? "kurtis" : product.category === "gown" ? "gowns" : product.category === "lehenga" ? "lehengas" : "shop"}`} className="hover:text-[#a0684f] transition-colors capitalize">
            {product.category === "salwar-suit" ? "Salwar Suits" : product.category + "s"}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-stone-800 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Image */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-stone-200/60 overflow-hidden shadow-sm sticky top-28">
              <div className="relative w-full h-[500px] sm:h-[600px] bg-[#fff] flex items-center justify-center p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain block bg-transparent"
                />
                {discountPercent > 0 && (
                  <div className="absolute top-6 left-6 bg-[#e05a47] text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                    SAVE {discountPercent}%
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-6 flex flex-col">
            <div>
              <div className="text-[11px] font-bold tracking-widest text-[#a0684f] uppercase mb-2">
                {product.category} • {product.occasion}
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#1c120e] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < (product.rating || 5) ? "fill-current" : "opacity-30"}`} />
                  ))}
                </div>
                <span className="text-xs text-stone-500 font-medium">({product.reviewsCount || 0} verified reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-4 pb-6 border-b border-stone-200">
                <span className="text-3xl font-serif font-black text-[#8a5a44]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-stone-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="bg-[#fcf2ee] text-[#8a5a44] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#f3d9ce]">
                  Bespoke Tailoring Included
                </span>
              </div>

              {/* Description */}
              <p className="text-stone-600 text-sm mt-5 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="mt-6 border border-stone-200/70 rounded-xl overflow-hidden text-xs">
                {[
                  { label: "Fabric Type", value: product.fabric },
                  { label: "Artistry & Work", value: product.work },
                  { label: "Occasion Theme", value: product.occasion },
                  { label: "Dispatch Time", value: "Within 2 Business Days" },
                  { label: "Packaging", value: "Fully Recyclable Signature Box" },
                ].map((spec, i) => (
                  <div key={i} className={`p-3 flex justify-between ${i < 4 ? "border-b border-stone-100" : ""} ${i % 2 === 0 ? "bg-white" : "bg-[#fffcf7]"}`}>
                    <span className="text-stone-500">{spec.label}:</span>
                    <span className="font-semibold text-stone-900 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-stone-900">Select Size:</span>
                  <button 
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-xs text-[#a0684f] font-bold hover:underline flex items-center gap-1"
                  >
                    <Info className="h-3.5 w-3.5" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(product.sizes || ["XS", "S", "M", "L", "XL", "XXL", "3XL"]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 rounded-lg border text-sm font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-[#1c120e] text-white border-[#1c120e] shadow-md'
                          : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Chart Popover */}
              {showSizeChart && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="bg-stone-50 font-bold border-b border-stone-200 text-stone-900">
                          <th className="p-2 border-r border-stone-200">Size</th>
                          <th className="p-2 border-r border-stone-200">Bust</th>
                          <th className="p-2 border-r border-stone-200">Waist</th>
                          <th className="p-2 border-r border-stone-200">Hip</th>
                          <th className="p-2 border-r border-stone-200">Shoulder</th>
                          <th className="p-2">Length</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChart.map((row) => (
                          <tr key={row.size} className={`border-b border-stone-100 ${row.size === selectedSize ? "bg-[#fdf2ee] font-bold" : ""}`}>
                            <td className="p-2 border-r border-stone-200 font-bold">{row.size}</td>
                            <td className="p-2 border-r border-stone-200">{row.bust}</td>
                            <td className="p-2 border-r border-stone-200">{row.waist}</td>
                            <td className="p-2 border-r border-stone-200">{row.hip}</td>
                            <td className="p-2 border-r border-stone-200">{row.shoulder}</td>
                            <td className="p-2">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-4 bg-[#1c120e] hover:bg-[#a0684f] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {addToCartSuccess ? (
                    <><Check className="h-4 w-4 text-[#d4af37]" /> Added to Bag!</>
                  ) : (
                    <><ShoppingBag className="h-4 w-4 text-[#d4af37]" /> Add {selectedSize} to Bag</>
                  )}
                </button>
                <button
                  onClick={() => setShowVideoForm(true)}
                  className="px-6 py-4 border-2 border-[#d4af37] bg-[#fffaf7] hover:bg-[#fdf2ee] text-stone-900 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Video className="h-4 w-4 text-[#d4af37]" /> Video Consult
                </button>
              </div>
              <Link
                href="/#sizing-lab"
                className="mt-3 w-full px-6 py-3 border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Scissors className="h-4 w-4 text-[#d4af37]" /> Custom Sizing Lab Fitting
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-stone-200 pt-12">
          <h2 className="text-2xl font-serif font-bold text-[#1c120e] mb-8">Client Reviews ({reviews.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white p-5 rounded-2xl border border-stone-200/80">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-current" : "opacity-30"}`} />
                  ))}
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">{review.comment}</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100">
                  <div className="w-8 h-8 rounded-full bg-[#f6eae1] flex items-center justify-center text-[#8a5a44] text-xs font-bold">
                    {review.reviewerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">{review.reviewerName}</p>
                    <p className="text-[10px] text-stone-400">Verified Purchase</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Review Form */}
          <div className="bg-[#fdf9f5] rounded-2xl border border-stone-200 p-6">
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">Share Your Experience</h3>
            {reviewSuccess ? (
              <p className="text-emerald-700 text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Thank you! Your review helps other patrons choose their perfect fit.
              </p>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                    <input type="text" required value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full p-2.5 border border-stone-200 rounded-lg text-xs" placeholder="E.g., Priyanka Kapoor" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <button type="button" key={star}
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className={`p-1 ${star <= reviewForm.rating ? "text-amber-500" : "text-stone-300"}`}>
                          <Star className={`h-5 w-5 ${star <= reviewForm.rating ? "fill-current" : ""}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Review</label>
                  <textarea required value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full p-2.5 border border-stone-200 rounded-lg text-xs h-24 resize-none"
                    placeholder="Tell us about the fabric, fit, and overall experience..." />
                </div>
                <button type="submit"
                  className="px-6 py-2.5 bg-[#1c120e] hover:bg-[#a0684f] text-white rounded-xl text-xs font-bold uppercase tracking-wider">
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-stone-200 pt-12">
            <h2 className="text-2xl font-serif font-bold text-[#1c120e] mb-8">You May Also Love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Video Consultation Modal */}
      {showVideoForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={() => setShowVideoForm(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-[#d4af37] p-6 max-w-md w-full relative z-10 shadow-2xl">
            <button onClick={() => setShowVideoForm(false)} className="absolute top-4 right-4 bg-stone-100 hover:bg-stone-200 text-stone-800 p-1.5 rounded-full"><X className="h-4 w-4" /></button>
            <div className="text-center mb-6">
              <Video className="h-8 w-8 text-[#d4af37] mx-auto animate-pulse" />
              <h3 className="text-xl font-serif font-black text-stone-950 mt-2">Video Consultation for</h3>
              <p className="text-xs text-stone-500 mt-1 line-clamp-1">{product.name}</p>
            </div>
            {videoSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-serif font-bold text-lg">Booking Confirmed!</h4>
                <p className="text-xs text-stone-500">Check your email for the Google Meet invitation.</p>
              </div>
            ) : (
              <form onSubmit={handleVideoSubmit} className="space-y-4 text-xs">
                {[
                  { label: "Full Name", type: "text", placeholder: "E.g., Anjali Sharma", key: "name" },
                  { label: "Email Address", type: "email", placeholder: "anjali@gmail.com", key: "email" },
                  { label: "Phone Number", type: "text", placeholder: "+91 99999 77777", key: "phone" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block font-semibold mb-1 text-stone-800">{f.label}</label>
                    <input type={f.type} required placeholder={f.placeholder}
                      value={videoForm[f.key as keyof typeof videoForm]}
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
                <button type="submit" className="w-full mt-6 py-3 bg-[#1c120e] hover:bg-[#a0684f] text-[#fffdfa] rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
                  Confirm Live Schedule
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      <Footer hideWhatsApp={true} />
      <WhatsAppFloat />
    </div>
  );
}
