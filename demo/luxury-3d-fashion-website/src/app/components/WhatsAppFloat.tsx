"use client";
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const phoneNumber = "919876543210"; // Peach Petals WhatsApp
  const defaultMsg = encodeURIComponent("Hi Peach Petals! I need help choosing the perfect outfit. 💕");

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
        {open && (
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 w-72 animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Peach Petals Support</p>
                  <p className="text-[10px] text-emerald-600">● Usually replies instantly</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              👋 Hi! Need styling help? Chat with our fashion advisors on WhatsApp for instant sizing guidance, order tracking, and video consultation bookings.
            </p>
            <a
              href={`https://wa.me/${phoneNumber}?text=${defaultMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold transition-colors"
            >
              Open WhatsApp Chat
            </a>
            <p className="text-[10px] text-stone-400 text-center mt-2">
              Order updates & consultation reminders sent via WhatsApp
            </p>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-[0_8px_24px_rgba(37,211,102,0.45)] flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-7 w-7" fill="white" />
        </button>
      </div>
    </>
  );
}
