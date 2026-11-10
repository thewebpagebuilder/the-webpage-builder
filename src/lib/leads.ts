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

const VALID_STATUSES: ReadonlySet<string> = new Set([
  "new",
  "contacted",
  "confirmed",
  "declined",
  "done",
]);

const VALID_SOURCES: ReadonlySet<string> = new Set([
  "audit",
  "demo",
  "contact",
  "call",
  "quotation",
]);

/**
 * Converts a Firestore Timestamp, Date, number, or string into an ISO date string.
 */
function toIsoString(value: unknown, fallback = new Date(0).toISOString()): string {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "number") return new Date(value).toISOString();
  if (typeof value === "object" && value !== null) {
    const maybeTimestamp = value as { toDate?: () => Date; seconds?: number };
    if (typeof maybeTimestamp.toDate === "function") {
      return maybeTimestamp.toDate().toISOString();
    }
    if (typeof maybeTimestamp.seconds === "number") {
      return new Date(maybeTimestamp.seconds * 1000).toISOString();
    }
  }
  return fallback;
}

/**
 * Normalizes a Firestore document into a safe Lead object so missing fields or
 * Firestore Timestamp values do not crash client components.
 */
function normalizeLead(id: string, raw: Record<string, unknown>): Lead {
  const status = typeof raw.status === "string" && VALID_STATUSES.has(raw.status)
    ? (raw.status as LeadStatus)
    : "new";
  const source = typeof raw.source === "string" && VALID_SOURCES.has(raw.source)
    ? (raw.source as LeadSource)
    : "contact";

  const createdAt = toIsoString(raw.createdAt ?? raw._serverTimestamp ?? raw.serverTimestamp);
  const updatedAt = toIsoString(raw.updatedAt, createdAt);

  return {
    ...(raw as Partial<Lead>),
    id,
    name: typeof raw.name === "string" ? raw.name : "Unnamed Lead",
    email: typeof raw.email === "string" ? raw.email : "",
    status,
    source,
    createdAt,
    updatedAt,
    paymentDate: raw.paymentDate ? toIsoString(raw.paymentDate) : undefined,
    scheduledDate: raw.scheduledDate ? toIsoString(raw.scheduledDate) : undefined,
  };
}

/**
 * Removes undefined fields to prevent Firestore serialization errors
 */
function sanitizeForFirestore<T extends Record<string, unknown>>(data: T): Partial<T> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as Partial<T>;
}

/**
 * Formats Firebase/Firestore errors into actionable messages for UI feedback.
 */
export function getFirestoreErrorMessage(error: unknown, fallback = "Database request failed."): string {
  const err = error as { code?: string; message?: string } | null;
  if (!err) return fallback;

  switch (err.code) {
    case "permission-denied":
      return "Firestore permission denied. Verify your Firestore Security Rules allow public lead creation and authenticated admin access, and ensure you are signed in.";
    case "unauthenticated":
      return "Your admin session has expired. Please sign in again.";
    case "unavailable":
      return "Unable to reach Firebase right now. Please check your internet connection and try again.";
    case "not-found":
      return "Firestore database or requested record was not found in this Firebase project.";
    default:
      return err.message || fallback;
  }
}

export async function getLeads(): Promise<Lead[]> {
  try {
    const leadsRef = collection(db, "leads");
    try {
      const q = query(leadsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const orderedLeads = snapshot.docs.map((docSnap) =>
        normalizeLead(docSnap.id, docSnap.data() as Record<string, unknown>)
      );

      // If any documents lack `createdAt`, Firestore's orderBy excludes them.
      // Check total count only when needed, or fall back on index errors below.
      return orderedLeads;
    } catch (innerErr: unknown) {
      const code = (innerErr as { code?: string } | null)?.code;
      // Do not retry if the error is permission/auth/network related
      if (code === "permission-denied" || code === "unauthenticated" || code === "unavailable") {
        throw innerErr;
      }

      // Fallback in case index is missing/building or createdAt field types vary
      const snapshot = await getDocs(leadsRef);
      const leads = snapshot.docs.map((docSnap) =>
        normalizeLead(docSnap.id, docSnap.data() as Record<string, unknown>)
      );
      return leads.sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }
  } catch (err) {
    console.error("Failed to fetch leads from Firestore:", err);
    throw err;
  }
}

export async function getLeadById(id: string): Promise<Lead | null> {
  try {
    const leadDocRef = doc(db, "leads", id);
    const snapshot = await getDoc(leadDocRef);
    if (!snapshot.exists()) {
      return null;
    }
    return normalizeLead(snapshot.id, snapshot.data() as Record<string, unknown>);
  } catch (err) {
    console.error(`Failed to fetch lead ${id} from Firestore:`, err);
    throw err;
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

    return normalizeLead(updatedDoc.id, updatedDoc.data() as Record<string, unknown>);
  } catch (error) {
    console.error("Error updating lead in Firestore:", error);
    throw error;
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
