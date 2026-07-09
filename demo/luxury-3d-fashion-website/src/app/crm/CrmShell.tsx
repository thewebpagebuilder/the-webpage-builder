"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Calendar, Users,
  Boxes, ClipboardList, Wallet, Bell, LogOut, Menu, X, Store
} from "lucide-react";
import { crmLogout } from "@/app/actions";

export default function CrmShell({
  session,
  children,
}: {
  session: { id: number; name: string; email: string; role: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = session.role === "admin";

  const navItems = [
    { href: "/crm", label: "Dashboard", icon: LayoutDashboard, adminOnly: false },
    { href: "/crm/products", label: "Products", icon: Package, adminOnly: true },
    { href: "/crm/orders", label: "Orders / Invoices", icon: ShoppingCart, adminOnly: false },
    { href: "/crm/consultations", label: "Consultations", icon: Calendar, adminOnly: false },
    { href: "/crm/inventory", label: "Stock Manager", icon: Boxes, adminOnly: false },
    { href: "/crm/employees", label: "Employees", icon: Users, adminOnly: true },
    { href: "/crm/attendance", label: "Attendance", icon: ClipboardList, adminOnly: false },
    { href: "/crm/payroll", label: "Payroll", icon: Wallet, adminOnly: true },
    { href: "/crm/notifications", label: "WhatsApp / Notifications", icon: Bell, adminOnly: false },
  ].filter(item => isAdmin || !item.adminOnly);

  const handleLogout = async () => {
    await crmLogout();
    router.push("/crm/login");
    router.refresh();
  };

  const Sidebar = () => (
    <aside className="w-64 bg-[#15100e] text-stone-200 h-screen flex flex-col border-r border-stone-800 fixed left-0 top-0 z-40">
      <div className="px-5 py-5 border-b border-stone-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#fff] rounded-xl flex items-center justify-center">
            <img src="https://cdn.shopify.com/s/files/1/0616/9100/2968/files/Logo_peach_1.png?v=1728278097" className="w-7 h-7 object-contain" alt="" />
          </div>
          <div>
            <div className="text-sm font-serif font-bold text-white">Peach Petals</div>
            <div className="text-[10px] text-[#d4af37] uppercase tracking-wider">CRM Console</div>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto text-sm">
        {navItems.map(item => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={()=>setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                active ? "bg-[#2b201c] text-[#f3d9b6] font-semibold" : "text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-stone-800">
        <div className="bg-[#1e1714] rounded-xl px-3 py-3 border border-stone-800">
          <div className="text-xs font-bold text-white">{session.name}</div>
          <div className="text-[11px] text-stone-400">{session.email}</div>
          <div className="mt-1 inline-block text-[10px] px-2 py-0.5 rounded bg-[#2b201c] text-[#d4af37] uppercase tracking-wider font-bold">{session.role}</div>
        </div>
        <div className="flex gap-2 mt-3">
          <Link href="/" className="flex-1 text-center py-2 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700 flex items-center justify-center gap-1.5">
            <Store className="h-3.5 w-3.5" /> Store
          </Link>
          <button onClick={handleLogout} className="flex-1 py-2 rounded-lg bg-stone-800 hover:bg-red-900/50 text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5">
            <LogOut className="h-3.5 w-3.5" /> Exit
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f7f2ee] text-stone-900">
      {/* mobile top bar */}
      <div className="lg:hidden bg-[#15100e] text-stone-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <span className="font-serif font-bold text-sm">Peach Petals CRM</span>
        <button onClick={()=>setMobileOpen(!mobileOpen)} className="p-1.5 rounded-lg bg-stone-800">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      
      {/* desktop sidebar */}
      <div className="hidden lg:block"><Sidebar /></div>
      {/* mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[55]">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setMobileOpen(false)} />
          <div className="relative w-64"><Sidebar /></div>
        </div>
      )}
      
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 sm:p-7 lg:p-9">
          {children}
        </div>
      </main>
    </div>
  );
}
