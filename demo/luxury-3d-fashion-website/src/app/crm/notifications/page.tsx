"use client";
import React, { useEffect, useState } from "react";
import { crmGetNotifications, crmMarkNotificationRead, sendWhatsApp } from "@/app/actions";

export default function NotificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [to, setTo] = useState("+919876543210");
  const [msg, setMsg] = useState("Hi! This is Peach Petals. Your order is being tailored with love 💕");

  const load = async () => setItems(await crmGetNotifications());
  useEffect(()=>{ load() }, []);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendWhatsApp(to, msg);
    setMsg("");
    load();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-serif font-bold text-stone-900">WhatsApp / CRM Notifications</h1>

      <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-5">
        <h2 className="font-semibold text-stone-900 mb-3">Send WhatsApp Update</h2>
        <form onSubmit={send} className="flex flex-col sm:flex-row gap-3">
          <input value={to} onChange={e=>setTo(e.target.value)} placeholder="+91XXXXXXXXXX" className="border border-stone-200 rounded-xl px-3 py-2 text-sm w-48" />
          <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Message" className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm" />
          <button className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebe58] text-white rounded-xl text-xs font-bold">Send via WhatsApp</button>
        </form>
        <p className="text-[11px] text-stone-500 mt-2">Simulated WhatsApp API – messages are logged to the CRM notification center. In production, connect to WhatsApp Business Cloud API.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm">
        <div className="px-5 py-3 border-b border-stone-100 font-semibold text-stone-800">Activity Feed (Orders, Consultations, WhatsApp)</div>
        <div className="divide-y divide-stone-100 max-h-[560px] overflow-y-auto">
          {items.map(n => (
            <div key={n.id} className={`px-5 py-3 text-sm ${n.read ? "opacity-70" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-stone-900">{n.title} {n.whatsappSent && <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full ml-1">WhatsApp ✓</span>}</div>
                  <div className="text-stone-600">{n.message}</div>
                  <div className="text-[11px] text-stone-400 mt-1">{new Date(n.createdAt!).toLocaleString("en-IN")}</div>
                </div>
                {!n.read && <button onClick={async()=>{ await crmMarkNotificationRead(n.id); load(); }} className="text-[11px] text-[#a0684f] font-bold hover:underline shrink-0">Mark read</button>}
              </div>
            </div>
          ))}
          {items.length===0 && <div className="px-5 py-10 text-center text-stone-400">No notifications yet</div>}
        </div>
      </div>
    </div>
  );
}
