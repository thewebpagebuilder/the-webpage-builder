"use client";
import React, { useEffect, useState } from "react";
import { crmListEmployees, crmUpsertEmployee } from "@/app/actions";

export default function EmployeesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const load = async () => setItems(await crmListEmployees());
  useEffect(()=>{ load() }, []);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await crmUpsertEmployee({
      id: editing.id,
      name: String(fd.get("name")),
      email: String(fd.get("email")),
      password: String(fd.get("password") || "") || undefined,
      role: String(fd.get("role")),
      phone: String(fd.get("phone") || ""),
      department: String(fd.get("department") || ""),
      salaryMonthly: parseInt(String(fd.get("salaryMonthly")||"35000"),10),
      hireDate: String(fd.get("hireDate") || "") || undefined,
      active: fd.get("active") === "on",
    });
    if (res.success) { setEditing(null); load(); } else alert(res.error);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-stone-900">Employees</h1>
        <button onClick={()=>setEditing({ role: "employee", salaryMonthly: 35000, active: true })}
          className="px-4 py-2 bg-[#1c120e] text-white rounded-xl text-xs font-bold uppercase">+ Add Employee</button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
            <tr><th className="text-left px-4 py-3">Name</th><th className="text-left px-4 py-3">Email</th><th className="text-left px-4 py-3">Department</th><th className="text-left px-4 py-3">Role</th><th className="text-right px-4 py-3">Salary</th><th className="px-4 py-3"></th></tr>
          </thead>
          <tbody>
            {items.map(u => (
              <tr key={u.id} className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold">{u.name}</td>
                <td className="px-4 py-3 text-stone-600">{u.email}</td>
                <td className="px-4 py-3">{u.department || "-"}</td>
                <td className="px-4 py-3"><span className={`text-[11px] px-2 py-0.5 rounded-full ${u.role==="admin" ? "bg-amber-100 text-amber-800" : "bg-stone-100 text-stone-700"}`}>{u.role}</span></td>
                <td className="px-4 py-3 text-right">₹{(u.salaryMonthly||0).toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right"><button onClick={()=>setEditing(u)} className="text-xs text-[#a0684f] font-bold hover:underline">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setEditing(null)} />
          <form onSubmit={save} className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-3 text-sm">
            <h2 className="font-serif font-bold text-lg">{editing.id ? "Edit Employee" : "Add Employee"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="name" defaultValue={editing.name || ""} placeholder="Full name" required className="border border-stone-200 rounded-lg px-3 py-2" />
              <input name="email" type="email" defaultValue={editing.email || ""} placeholder="Email" required className="border border-stone-200 rounded-lg px-3 py-2" />
              <input name="password" type="password" placeholder={editing.id ? "Leave blank to keep password" : "Password"} className="border border-stone-200 rounded-lg px-3 py-2" />
              <select name="role" defaultValue={editing.role || "employee"} className="border border-stone-200 rounded-lg px-3 py-2 bg-white">
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
              <input name="phone" defaultValue={editing.phone || ""} placeholder="Phone" className="border border-stone-200 rounded-lg px-3 py-2" />
              <input name="department" defaultValue={editing.department || ""} placeholder="Department" className="border border-stone-200 rounded-lg px-3 py-2" />
              <input name="salaryMonthly" type="number" defaultValue={editing.salaryMonthly || 35000} placeholder="Monthly Salary" className="border border-stone-200 rounded-lg px-3 py-2" />
              <input name="hireDate" type="date" defaultValue={editing.hireDate || ""} className="border border-stone-200 rounded-lg px-3 py-2" />
            </div>
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="active" defaultChecked={editing.active ?? true} /> Active</label>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={()=>setEditing(null)} className="px-4 py-2 rounded-xl border">Cancel</button>
              <button className="px-4 py-2 rounded-xl bg-[#1c120e] text-white font-bold text-xs">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
