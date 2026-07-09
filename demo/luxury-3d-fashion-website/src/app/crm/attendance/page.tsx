"use client";
import React, { useEffect, useState } from "react";
import { crmListEmployees, crmGetAttendance, crmMarkAttendance, crmGetSession } from "@/app/actions";

export default function AttendancePage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);

  const load = async () => {
    const s = await crmGetSession();
    setSession(s);
    if (s?.role === "admin") {
      setEmployees(await crmListEmployees());
    }
    setLogs(await crmGetAttendance(s?.role === "admin" ? undefined : s?.id));
  };

  useEffect(()=>{ load() }, []);

  const mark = async (userId: number, status: string) => {
    await crmMarkAttendance(userId, status);
    load();
  };

  const isAdmin = session?.role === "admin";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900">Attendance</h1>

      {isAdmin && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
          <h2 className="font-semibold mb-3">Mark Today&apos;s Attendance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {employees.map(e => (
              <div key={e.id} className="border border-stone-200 rounded-xl px-3 py-2.5 flex items-center justify-between">
                <div><div className="font-semibold">{e.name}</div><div className="text-xs text-stone-500">{e.department}</div></div>
                <div className="flex gap-1">
                  {["present","absent","half_day","late"].map(st => (
                    <button key={st} onClick={()=>mark(e.id, st)} className="text-[10px] px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded-full capitalize">{st.replace("_"," ")}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100 font-semibold">Attendance Log</div>
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
            <tr><th className="text-left px-4 py-2">Date</th><th className="text-left px-4 py-2">User ID</th><th className="text-left px-4 py-2">Status</th><th className="text-left px-4 py-2">Check In</th><th className="text-left px-4 py-2">Notes</th></tr>
          </thead>
          <tbody>
            {logs.map((l:any) => (
              <tr key={l.id} className="border-t border-stone-100">
                <td className="px-4 py-2">{l.date}</td>
                <td className="px-4 py-2">#{l.userId}</td>
                <td className="px-4 py-2 capitalize">{l.status}</td>
                <td className="px-4 py-2 text-xs text-stone-500">{l.checkIn ? new Date(l.checkIn).toLocaleTimeString() : "-"}</td>
                <td className="px-4 py-2 text-xs">{l.notes || "-"}</td>
              </tr>
            ))}
            {logs.length===0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-400">No attendance records yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
