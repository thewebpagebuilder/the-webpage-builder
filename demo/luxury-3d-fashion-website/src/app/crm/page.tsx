import { crmGetDashboard, crmGetNotifications } from "@/app/actions";
import Link from "next/link";
import { Package, ShoppingCart, Calendar, Users, IndianRupee, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CrmDashboardPage() {
  const data = await crmGetDashboard();
  const notifications = await crmGetNotifications();
  if (!data) return null;

  const cards = [
    { label: "Total Products", value: data.productCount, icon: Package, color: "bg-amber-50 text-amber-800" },
    { label: "Orders", value: data.orderCount, icon: ShoppingCart, color: "bg-emerald-50 text-emerald-800" },
    { label: "Consultations", value: data.consultationCount, icon: Calendar, color: "bg-sky-50 text-sky-800" },
    { label: "Employees", value: data.userCount, icon: Users, color: "bg-fuchsia-50 text-fuchsia-800" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-[26px] font-serif font-bold text-stone-900">CRM Dashboard</h1>
          <p className="text-sm text-stone-500 mt-1">Peach Petals – Inventory, Orders, Staff & WhatsApp hub</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl px-4 py-2.5 shadow-sm">
          <div className="text-[11px] text-stone-500 uppercase tracking-wider">Revenue (All time)</div>
          <div className="text-xl font-serif font-bold text-[#8a5a44] flex items-center gap-1">
            <IndianRupee className="h-4 w-4" /> {data.revenue.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.color} mb-3`}>
              <c.icon className="h-4 w-4" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">{c.value}</div>
            <div className="text-xs text-stone-500 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-serif font-bold text-stone-900">Recent Orders</h2>
            <Link href="/crm/orders" className="text-xs text-[#a0684f] font-bold hover:underline">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="text-left px-5 py-2.5">Invoice</th>
                  <th className="text-left px-5 py-2.5">Customer</th>
                  <th className="text-left px-5 py-2.5">Product</th>
                  <th className="text-right px-5 py-2.5">Amount</th>
                  <th className="text-left px-5 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map(o => (
                  <tr key={o.id} className="border-t border-stone-100">
                    <td className="px-5 py-3 font-mono text-xs">{o.invoiceNumber}</td>
                    <td className="px-5 py-3">{o.customerName}</td>
                    <td className="px-5 py-3 text-stone-600 max-w-[220px] truncate">{o.productTitle}</td>
                    <td className="px-5 py-3 text-right font-semibold">₹{o.totalAmount.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3">
                      <span className="text-[11px] bg-stone-100 px-2 py-0.5 rounded-full capitalize">{o.orderStatus}</span>
                    </td>
                  </tr>
                ))}
                {data.recentOrders.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-stone-400 text-sm">No orders yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm">
            <div className="px-5 py-3 border-b border-amber-100 flex items-center gap-2 text-amber-800 font-semibold text-sm">
              <AlertTriangle className="h-4 w-4" /> Low Stock Alerts
            </div>
            <div className="p-4 space-y-2 text-xs">
              {data.lowStock.length === 0 && <p className="text-stone-500">All stock levels healthy ✅</p>}
              {data.lowStock.map(p => (
                <div key={p.id} className="flex justify-between items-center bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                  <span className="text-stone-800 font-medium truncate pr-2">{p.name}</span>
                  <span className="font-bold text-amber-800">{p.stockQuantity} left</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm">
            <div className="px-5 py-3 border-b border-stone-100 font-serif font-bold">WhatsApp / CRM Feed</div>
            <div className="p-4 space-y-2.5 max-h-72 overflow-y-auto text-xs">
              {notifications.slice(0, 8).map(n => (
                <div key={n.id} className="border-l-2 border-[#d4af37] pl-3 py-1.5 bg-stone-50 rounded-r-lg">
                  <div className="font-semibold text-stone-800">{n.title}</div>
                  <div className="text-stone-600">{n.message}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    {n.whatsappSent ? "✓ WhatsApp sent" : "CRM only"} • {new Date(n.createdAt!).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
              {notifications.length === 0 && <div className="text-stone-400">No notifications yet</div>}
            </div>
            <div className="px-4 pb-3">
              <Link href="/crm/notifications" className="text-xs text-[#a0684f] font-bold hover:underline">Open full WhatsApp center →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
