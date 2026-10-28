"use client";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type LeadStatus = "new" | "contacted" | "confirmed" | "declined" | "done";
export type LeadSource = "audit" | "demo" | "contact" | "call" | "quotation";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  message?: string;
  vision?: string;
  challenge?: string;
  requirements?: string;
  projectType?: string;
  timeline?: string;
  budget?: string;
  status: LeadStatus;
  source: LeadSource;
  scheduledDate?: string;
  scheduledTime?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  paymentReference?: string;
  paymentDate?: string;
  invoiceGenerated?: boolean;
  gstApplicable?: boolean;
}

/**
 * Removes undefined fields to prevent Firestore serialization errors
 */
function sanitizeForFirestore<T extends Record<string, any>>(data: T): Partial<T> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as Partial<T>;
}

export async function getLeads(): Promise<Lead[]> {
  try {
    const leadsRef = collection(db, "leads");
    // Attempt sorted query first
    try {
      const q = query(leadsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Lead, "id">),
      })) as Lead[];
    } catch {
      // Fallback in case index is building or createdAt field missing
      const snapshot = await getDocs(leadsRef);
      const leads = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Lead, "id">),
      })) as Lead[];
      return leads.sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }
  } catch (err) {
    console.error("Failed to fetch leads from Firestore:", err);
    return [];
  }
}

export async function saveLead(
  lead: Omit<Lead, "id" | "createdAt" | "updatedAt" | "status"> & { status?: LeadStatus }
): Promise<Lead> {
  try {
    const now = new Date().toISOString();
    const newLeadData = {
      ...lead,
      status: lead.status || "new",
      createdAt: now,
      updatedAt: now,
    };

    const sanitized = sanitizeForFirestore({
      ...newLeadData,
      _serverTimestamp: serverTimestamp(),
    });

    const leadsRef = collection(db, "leads");
    const docRef = await addDoc(leadsRef, sanitized);

    return {
      id: docRef.id,
      ...newLeadData,
    } as Lead;
  } catch (error) {
    console.error("Error saving lead to Firestore:", error);
    throw error;
  }
}

export async function updateLead(
  id: string,
  updates: Partial<Omit<Lead, "id" | "createdAt">>
): Promise<Lead | null> {
  try {
    const now = new Date().toISOString();
    const updatedData = sanitizeForFirestore({
      ...updates,
      updatedAt: now,
    });

    const leadDocRef = doc(db, "leads", id);
    await updateDoc(leadDocRef, updatedData);

    const updatedDoc = await getDoc(leadDocRef);
    if (!updatedDoc.exists()) {
      return null;
    }

    return {
      id: updatedDoc.id,
      ...(updatedDoc.data() as Omit<Lead, "id">),
    } as Lead;
  } catch (error) {
    console.error("Error updating lead in Firestore:", error);
    return null;
  }
}

export async function deleteLead(id: string): Promise<void> {
  try {
    const leadDocRef = doc(db, "leads", id);
    await deleteDoc(leadDocRef);
  } catch (error) {
    console.error("Error deleting lead from Firestore:", error);
    throw error;
  }
}

export function getLeadStats(leads: Lead[]) {
  const total = leads.length;
  const byStatus = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<LeadStatus, number>);

  const totalPipeline = leads
    .filter((l) => ["new", "contacted", "confirmed"].includes(l.status))
    .reduce((sum, l) => {
      const budget = parseBudget(l.budget || "");
      return sum + budget;
    }, 0);

  const wonValue = leads
    .filter((l) => l.status === "done")
    .reduce((sum, l) => {
      const budget = parseBudget(l.budget || "");
      return sum + budget;
    }, 0);

  return {
    total,
    byStatus,
    totalPipeline,
    wonValue,
    conversionRate: total > 0 ? Math.round(((byStatus.done || 0) / total) * 100) : 0,
  };
}

export function parseBudget(budgetStr: string): number {
  if (!budgetStr) return 0;
  const cleaned = budgetStr.toLowerCase().replace(/[^0-9kl.]/g, "");
  if (cleaned.includes("l")) {
    const num = parseFloat(cleaned.replace("l", ""));
    return num * 100000;
  }
  if (cleaned.includes("k")) {
    const num = parseFloat(cleaned.replace("k", ""));
    return num * 1000;
  }
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString()}`;
}

export function exportLeadsCSV(leads: Lead[]): void {
  const headers = ["Name", "Email", "Phone", "Company", "Source", "Status", "Budget", "Created", "Message"];
  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.phone || "",
    l.company || "",
    l.source,
    l.status,
    l.budget || "",
    new Date(l.createdAt).toLocaleDateString(),
    (l.message || l.vision || l.challenge || "").replace(/[\n\r,]/g, " ").slice(0, 100),
  ]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
