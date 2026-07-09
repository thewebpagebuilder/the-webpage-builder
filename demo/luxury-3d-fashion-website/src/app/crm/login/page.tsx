"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { crmLogin } from "@/app/actions";
import { Shield, Lock, Mail } from "lucide-react";

export default function CrmLoginPage() {
  const [email, setEmail] = useState("admin@peachpetals.in");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await crmLogin(email, password);
    if (res.success) {
      router.push("/crm");
      router.refresh();
    } else {
      setError(res.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120c0a] via-[#1e1411] to-[#2a1815] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-[24px] shadow-2xl border border-[#d4af37]/30 p-8">
          <div className="text-center mb-7">
            <div className="w-14 h-14 bg-[#1c120e] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Shield className="h-7 w-7 text-[#d4af37]" />
            </div>
            <h1 className="text-xl font-serif font-bold text-stone-900">Peach Petals CRM</h1>
            <p className="text-xs text-stone-500 mt-1">Owner & Staff Login Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#1c120e] hover:bg-[#2b1d18] text-white text-sm font-bold tracking-wider uppercase transition-all disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In to CRM"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-stone-100 text-[11px] text-stone-500 leading-relaxed">
            <p className="font-bold text-stone-700 mb-1">Demo Accounts</p>
            <p><b>Admin:</b> admin@peachpetals.in / admin123</p>
            <p><b>Employee:</b> priya@peachpetals.in / peach123</p>
            <p className="mt-2">Admin: Full access • Employee: Orders, invoices, stock, consultations</p>
          </div>
        </div>
        <p className="text-center text-[10px] text-stone-400 mt-4">
          © 2026 Peach Petals Luxury CRM
        </p>
      </div>
    </div>
  );
}
