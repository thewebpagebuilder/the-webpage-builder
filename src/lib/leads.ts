import { supabase } from "./supabase";

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
}

export async function getLeads(): Promise<Lead[]> {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching leads from Supabase:", error);
      return [];
    }
    return (data || []) as Lead[];
  } catch (err) {
    console.error("Failed to get leads:", err);
    return [];
  }
}

export async function saveLead(lead: Omit<Lead, "id" | "createdAt" | "updatedAt" | "status"> & { status?: LeadStatus }): Promise<Lead> {
  const newLead = {
    ...lead,
    status: lead.status || "new",
  };

  const { data, error } = await supabase
    .from("leads")
    .insert([newLead])
    .select()
    .single();

  if (error) {
    console.error("Error saving lead to Supabase:", error);
    throw error;
  }
  return data as Lead;
}

export async function updateLead(id: string, updates: Partial<Omit<Lead, "id" | "createdAt">>): Promise<Lead | null> {
  const updatedData = {
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("leads")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating lead in Supabase:", error);
    return null;
  }
  return data as Lead;
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting lead from Supabase:", error);
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
