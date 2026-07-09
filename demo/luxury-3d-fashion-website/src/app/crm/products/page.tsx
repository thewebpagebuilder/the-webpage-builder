"use client";

import React, { useEffect, useState, useTransition } from "react";
import { getAllProducts, crmUpsertProduct, crmDeleteProduct, getCategories } from "@/app/actions";

type Product = Awaited<ReturnType<typeof getAllProducts>>[number];

export default function CrmProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => startTransition(async () => {
    const p = await getAllProducts();
    setProducts(p);
  });

  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const cpRaw = String(fd.get("costPrice") || "");
    const res = await crmUpsertProduct({
      id: editing.id,
      name: String(fd.get("name") || ""),
      description: String(fd.get("description") || ""),
      category: String(fd.get("category") || "kurti"),
      price: parseInt(String(fd.get("price") || "0"), 10),
      originalPrice: fd.get("originalPrice") ? parseInt(String(fd.get("originalPrice")), 10) : null,
      image: String(fd.get("image") || ""),
      fabric: String(fd.get("fabric") || ""),
      work: String(fd.get("work") || ""),
      occasion: String(fd.get("occasion") || ""),
      sizes: String(fd.get("sizes") || "XS,S,M,L,XL,XXL").split(",").map(s=>s.trim()),
      colors: String(fd.get("colors") || "").split(",").map(s=>s.trim()).filter(Boolean),
      featured: fd.get("featured") === "on",
      stockQuantity: parseInt(String(fd.get("stockQuantity") || "25"), 10),
      sku: String(fd.get("sku") || ""),
      costPrice: cpRaw ? parseInt(cpRaw, 10) : undefined,
      active: fd.get("active") !== null,
    });
    if (res.success) { setEditing(null); load(); }
    else alert(res.error);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-serif font-bold text-stone-900">Products Manager</h1>
        <button onClick={()=>setEditing({ category: "kurti", price: 2990, sizes: ["S","M","L","XL"], colors: [], featured: false, stockQuantity: 25, active: true } as any)}
          className="px-4 py-2 bg-[#1c120e] text-white rounded-xl text-xs font-bold uppercase tracking-wider">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
              <tr>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-right px-4 py-3">Price</th>
                <th className="text-right px-4 py-3">Stock</th>
                <th className="text-left px-4 py-3">SKU</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t border-stone-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-12 h-14 object-contain bg-stone-50 rounded border" />
                      <div>
                        <div className="font-semibold text-stone-900 line-clamp-1 max-w-[280px]">{p.name}</div>
                        <div className="text-[11px] text-stone-500">{p.fabric} • {p.work}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3 text-right font-semibold">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className={`px-4 py-3 text-right font-bold ${(p.stockQuantity||0) <= 5 ? "text-amber-700" : "text-stone-800"}`}>{p.stockQuantity ?? 0}</td>
                  <td className="px-4 py-3 font-mono text-xs">{p.sku || "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={()=>setEditing(p)} className="text-xs text-[#a0684f] font-bold hover:underline mr-3">Edit</button>
                    <button onClick={async()=>{ if(confirm("Hide this product?")) { await crmDeleteProduct(p.id); load(); }}} className="text-xs text-stone-500 hover:text-red-600">Hide</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setEditing(null)} />
          <form onSubmit={save} className="relative bg-white rounded-[20px] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 border border-stone-200">
            <h2 className="font-serif font-bold text-lg mb-4">{editing.id ? "Edit Product" : "Add New Product"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <label className="block sm:col-span-2">Product Name
                <input name="name" defaultValue={editing.name || ""} required className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label className="block sm:col-span-2">Description
                <textarea name="description" defaultValue={editing.description || ""} required className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2 h-24" />
              </label>
              <label>Category
                <select name="category" defaultValue={editing.category || "kurti"} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2 bg-white">
                  <option value="kurti">Kurtis</option>
                  <option value="gown">Gowns</option>
                  <option value="lehenga">Lehengas</option>
                  <option value="salwar-suit">Salwar Suit</option>
                </select>
              </label>
              <label>Image URL
                <input name="image" defaultValue={editing.image || ""} required placeholder="https://peachpetals.in/cdn/... or any image URL"
                  className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>Price (₹)
                <input type="number" name="price" defaultValue={editing.price || 0} required className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>MRP / Original Price
                <input type="number" name="originalPrice" defaultValue={editing.originalPrice || ""} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>Fabric
                <input name="fabric" defaultValue={editing.fabric || ""} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>Work / Embroidery
                <input name="work" defaultValue={editing.work || ""} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>Occasion
                <input name="occasion" defaultValue={editing.occasion || ""} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>Sizes (comma separated)
                <input name="sizes" defaultValue={(editing.sizes || ["S","M","L","XL"]).join(",")} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>Colors (comma separated)
                <input name="colors" defaultValue={(editing.colors || []).join(",")} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>Stock Qty
                <input type="number" name="stockQuantity" defaultValue={editing.stockQuantity || 25} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>SKU
                <input name="sku" defaultValue={editing.sku || ""} placeholder="Auto if blank" className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
              <label>Cost Price (₹)
                <input type="number" name="costPrice" defaultValue={editing.costPrice || ""} className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2" />
              </label>
            </div>

            <div className="flex items-center gap-4 mt-4 text-xs">
              <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={!!editing.featured} /> Featured on homepage</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="active" defaultChecked={editing.active ?? true} /> Active / visible in store</label>
            </div>

            {editing.image && (
              <div className="mt-4 bg-stone-50 rounded-xl border p-3">
                <div className="text-[11px] text-stone-500 mb-2">Image Preview</div>
                <img src={editing.image} alt="" className="h-48 object-contain bg-white rounded border mx-auto" onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3"; }} />
              </div>
            )}

            <div className="flex justify-end gap-2 mt-5">
              <button type="button" onClick={()=>setEditing(null)} className="px-4 py-2 rounded-xl border border-stone-200 text-sm">Cancel</button>
              <button className="px-5 py-2 rounded-xl bg-[#1c120e] text-white text-sm font-bold">Save Product</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
