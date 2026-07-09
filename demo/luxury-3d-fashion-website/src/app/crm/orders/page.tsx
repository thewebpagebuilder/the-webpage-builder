"use client";
import React, { useEffect, useState, useTransition } from "react";
import { crmListOrders, crmUpdateOrderStatus, getAllProducts, crmCreateOrder } from "@/app/actions";

export default function CrmOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customerName:"", customerEmail:"", phone:"", address:"", productId: 0, size:"M", quantity:1 });
  const [isPending, startTransition] = useTransition();

  const load = () => startTransition(async () => {
    const o = await crmListOrders();
    setOrders(o);
    const p = await getAllProducts();
    setProducts(p);
    if (p[0] && !form.productId) setForm(f=>({...f, productId: p[0].id }));
  });

  useEffect(()=>{ load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await crmCreateOrder(form as any);
    if (res.success) { setShowForm(false); setForm({ customerName:"", customerEmail:"", phone:"", address:"", productId: products[0]?.id || 0, size:"M", quantity:1 }); load(); }
    else alert(res.error);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-serif font-bold text-stone-900">Orders & Invoices</h1>
        <button onClick={()=>setShowForm(true)} className="px-4 py-2.5 bg-[#1c120e] text-white rounded-xl text-xs font-bold uppercase tracking-wider">+ New Order</button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
              <tr><th className="text-left px-4 py-3">Invoice</th><th className="text-left px-4 py-3">Customer</th><th className="text-left px-4 py-3">Product</th><th className="text-left px-4 py-3">Size</th><th className="text-right px-4 py-3">Total</th><th className="text-left px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t border-stone-100">
                  <td className="px-4 py-3 font-mono text-xs">{o.invoiceNumber}</td>
                  <td className="px-4 py-3"><div className="font-semibold">{o.customerName}</div><div className="text-xs text-stone-500">{o.phone}</div></td>
                  <td className="px-4 py-3 max-w-[260px] truncate">{o.productTitle}</td>
                  <td className="px-4 py-3">{o.size || "-"}</td>
                  <td className="px-4 py-3 text-right font-bold">₹{o.totalAmount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <select value={o.orderStatus} onChange={async e => { await crmUpdateOrderStatus(o.id, e.target.value); load(); }}
                      className="text-xs border border-stone-200 rounded-lg px-2 py-1 bg-white">
                      <option value="confirmed">Confirmed</option>
                      <option value="tailoring">Tailoring</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`/api/crm/invoice/${o.id}`} target="_blank" className="text-xs text-[#a0684f] font-bold hover:underline">Print Invoice</a>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-stone-400">No orders yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setShowForm(false)} />
          <form onSubmit={submit} className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-3 text-sm">
            <h2 className="font-serif font-bold text-lg">Create Order / Generate Invoice</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input placeholder="Customer name" value={form.customerName} onChange={e=>setForm({...form, customerName:e.target.value})} required className="border border-stone-200 rounded-lg px-3 py-2" />
              <input placeholder="Email" type="email" value={form.customerEmail} onChange={e=>setForm({...form, customerEmail:e.target.value})} required className="border border-stone-200 rounded-lg px-3 py-2" />
              <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required className="border border-stone-200 rounded-lg px-3 py-2" />
              <input placeholder="Size (e.g., M)" value={form.size} onChange={e=>setForm({...form, size:e.target.value})} className="border border-stone-200 rounded-lg px-3 py-2" />
              <select value={form.productId} onChange={e=>setForm({...form, productId: parseInt(e.target.value)})} className="sm:col-span-2 border border-stone-200 rounded-lg px-3 py-2 bg-white">
                {products.map(p => <option key={p.id} value={p.id}>{p.name} — ₹{p.price.toLocaleString("en-IN")} (Stock: {p.stockQuantity})</option>)}
              </select>
              <input placeholder="Quantity" type="number" min={1} value={form.quantity} onChange={e=>setForm({...form, quantity: parseInt(e.target.value)||1})} className="border border-stone-200 rounded-lg px-3 py-2" />
              <input placeholder="Delivery address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} className="border border-stone-200 rounded-lg px-3 py-2" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={()=>setShowForm(false)} className="px-4 py-2 rounded-xl border">Cancel</button>
              <button className="px-5 py-2 rounded-xl bg-[#1c120e] text-white font-bold text-xs uppercase">Create & Invoice</button>
            </div>
            <p className="text-[11px] text-stone-500">Invoice auto-generated. Stock auto-deducted. WhatsApp notification sent.</p>
          </form>
        </div>
      )}
    </div>
  );
}
