"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts, crmAdjustStock } from "@/app/actions";

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [adjusting, setAdjusting] = useState<any>(null);
  const [qty, setQty] = useState(0);
  const [reason, setReason] = useState("restock");

  const load = async () => setProducts(await getAllProducts());
  useEffect(()=>{ load() }, []);

  const save = async () => {
    if (!adjusting) return;
    await crmAdjustStock(adjusting.id, qty, reason, "Manual CRM adjustment");
    setAdjusting(null); setQty(0); load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900">Stock & Inventory</h1>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
            <tr><th className="text-left px-4 py-3">Product</th><th className="text-left px-4 py-3">SKU</th><th className="text-right px-4 py-3">Stock</th><th className="text-right px-4 py-3">Cost</th><th className="text-right px-4 py-3">Sell</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody>
            {products.map(p => {
              const low = (p.stockQuantity ?? 0) <= (p.lowStockThreshold ?? 5);
              return (
              <tr key={p.id} className="border-t border-stone-100">
                <td className="px-4 py-3"><div className="font-semibold">{p.name}</div><div className="text-[11px] text-stone-500">{p.category}</div></td>
                <td className="px-4 py-3 font-mono text-xs">{p.sku || "-"}</td>
                <td className={`px-4 py-3 text-right font-bold ${low ? "text-amber-700" : ""}`}>{p.stockQuantity ?? 0}{low ? " ⚠" : ""}</td>
                <td className="px-4 py-3 text-right">₹{(p.costPrice||0).toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right font-semibold">₹{p.price.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <button onClick={()=>setAdjusting(p)} className="text-xs text-[#a0684f] font-bold hover:underline">Adjust Stock</button>
                </td>
              </tr>);
            })}
          </tbody>
        </table>
      </div>

      {adjusting && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setAdjusting(null)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="font-serif font-bold text-lg">Adjust Stock</h2>
            <p className="text-xs text-stone-500 mt-1">{adjusting.name}</p>
            <p className="text-xs text-stone-500">Current: {adjusting.stockQuantity}</p>
            <div className="mt-4 space-y-3 text-sm">
              <label className="block">Quantity Change (use negative to reduce)
                <input type="number" value={qty} onChange={e=>setQty(parseInt(e.target.value)||0)} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label className="block">Reason
                <select value={reason} onChange={e=>setReason(e.target.value)} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2 bg-white">
                  <option value="restock">Restock</option>
                  <option value="adjustment">Adjustment</option>
                  <option value="return">Customer Return</option>
                  <option value="damage">Damage / Loss</option>
                </select>
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={()=>setAdjusting(null)} className="px-4 py-2 rounded-xl border text-sm">Cancel</button>
              <button onClick={save} className="px-4 py-2 rounded-xl bg-[#1c120e] text-white text-sm font-bold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
