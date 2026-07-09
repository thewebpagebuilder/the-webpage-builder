"use client";
import React, { useEffect, useState } from "react";
import { crmListConsultations, crmUpdateConsultation, sendWhatsApp } from "@/app/actions";

export default function ConsultationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const load = async () => setItems(await crmListConsultations());
  useEffect(()=>{ load(); }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900">Video Consultations</h1>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
            <tr><th className="text-left px-4 py-3">Customer</th><th className="text-left px-4 py-3">Contact</th><th className="text-left px-4 py-3">Date / Slot</th><th className="text-left px-4 py-3">Product Interest</th><th className="text-left px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id} className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold">{c.customerName}</td>
                <td className="px-4 py-3 text-xs">{c.customerEmail}<br/>{c.phone}</td>
                <td className="px-4 py-3">{c.date}<br/><span className="text-xs text-stone-500">{c.timeSlot}</span></td>
                <td className="px-4 py-3 text-xs max-w-[200px] truncate">{c.productTitle || "General"}</td>
                <td className="px-4 py-3">
                  <select value={c.status} onChange={async e => { await crmUpdateConsultation(c.id, e.target.value); load(); }}
                    className="text-xs border border-stone-200 rounded-lg px-2 py-1 bg-white">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button onClick={async ()=>{ await sendWhatsApp(c.phone, `Hi ${c.customerName}, your Peach Petals video consultation on ${c.date} at ${c.timeSlot} is confirmed. Join link will be shared 15 mins prior. 💕`); alert("WhatsApp reminder sent (simulated)");}}
                    className="text-[11px] bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-bold">WhatsApp</button>
                </td>
              </tr>
            ))}
            {items.length===0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-stone-400">No consultations yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
