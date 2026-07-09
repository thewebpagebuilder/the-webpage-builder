"use client";
import React, { useEffect, useState } from "react";
import { crmListPayroll, crmListEmployees, crmCreatePayroll, crmPayPayroll } from "@/app/actions";

export default function PayrollPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [form, setForm] = useState({ userId: 0, month: new Date().getMonth()+1, year: new Date().getFullYear(), bonus: 0, deductions: 0 });
  const load = async () => { setRows(await crmListPayroll()); setEmployees(await crmListEmployees()); };
  useEffect(()=>{ load() }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userId) return alert("Select employee");
    const res = await crmCreatePayroll(form.userId, form.month, form.year, form.bonus, form.deductions);
    if (res.success) load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900">Payroll</h1>

      <form onSubmit={submit} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 grid grid-cols-2 sm:grid-cols-6 gap-3 text-sm items-end">
        <div className="sm:col-span-2">
          <label className="text-xs text-stone-600">Employee</label>
          <select value={form.userId} onChange={e=>setForm({...form, userId: parseInt(e.target.value)})} className="w-full border border-stone-200 rounded-lg px-3 py-2 bg-white">
            <option value={0}>Select…</option>
            {employees.map((e:any)=><option key={e.id} value={e.id}>{e.name} – ₹{(e.salaryMonthly||0).toLocaleString("en-IN")}</option>)}
          </select>
        </div>
        <div><label className="text-xs text-stone-600">Month</label>
          <input type="number" min={1} max={12} value={form.month} onChange={e=>setForm({...form, month: parseInt(e.target.value)||1})} className="w-full border border-stone-200 rounded-lg px-3 py-2" /></div>
        <div><label className="text-xs text-stone-600">Year</label>
          <input type="number" value={form.year} onChange={e=>setForm({...form, year: parseInt(e.target.value)||2026})} className="w-full border border-stone-200 rounded-lg px-3 py-2" /></div>
        <div><label className="text-xs text-stone-600">Bonus ₹</label>
          <input type="number" value={form.bonus} onChange={e=>setForm({...form, bonus: parseInt(e.target.value)||0})} className="w-full border border-stone-200 rounded-lg px-3 py-2" /></div>
        <div><label className="text-xs text-stone-600">Deductions ₹</label>
          <input type="number" value={form.deductions} onChange={e=>setForm({...form, deductions: parseInt(e.target.value)||0})} className="w-full border border-stone-200 rounded-lg px-3 py-2" /></div>
        <div className="sm:col-span-6">
          <button className="px-4 py-2 rounded-xl bg-[#1c120e] text-white text-xs font-bold">Create Payroll Entry</button>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
            <tr><th className="text-left px-4 py-3">Employee</th><th className="text-left px-4 py-3">Period</th><th className="text-right px-4 py-3">Base</th><th className="text-right px-4 py-3">Bonus</th><th className="text-right px-4 py-3">Deductions</th><th className="text-right px-4 py-3">Net Pay</th><th className="px-4 py-3">Status</th></tr>
          </thead>
          <tbody>
            {rows.map((r:any) => (
              <tr key={r.payroll.id} className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold">{r.user?.name || `#${r.payroll.userId}`}</td>
                <td className="px-4 py-3">{r.payroll.month}/{r.payroll.year}</td>
                <td className="px-4 py-3 text-right">₹{r.payroll.baseSalary.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right text-emerald-700">₹{r.payroll.bonus.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right text-amber-700">₹{r.payroll.deductions.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right font-bold">₹{r.payroll.netPay.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  {r.payroll.status === "paid" ? (
                    <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-bold">Paid</span>
                  ) : (
                    <button onClick={async()=>{ await crmPayPayroll(r.payroll.id); load(); }} className="text-[11px] bg-stone-900 text-white px-2.5 py-1 rounded-full font-bold">Mark Paid</button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length===0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-stone-400">No payroll entries yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
