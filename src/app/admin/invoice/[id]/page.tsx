"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLeads, type Lead } from "@/lib/leads";
import { parseBudget } from "@/lib/leads";
import InvoiceLayout, { InvoiceData } from "@/components/admin/InvoiceLayout";

export default function InvoicePage() {
  const { id } = useParams();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLead() {
      try {
        const leads = await getLeads();
        const found = leads.find((l) => l.id === id);
        if (found) {
          setLead(found);
        }
      } catch (err) {
        console.error("Failed to load lead for invoice:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadLead();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="animate-spin w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <p>Lead not found.</p>
      </div>
    );
  }

  const initialData: InvoiceData = {
    invoiceNo: `INV-${lead.id}`,
    date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
    paidOn: lead.paymentDate ? `PAID ON ${new Date(lead.paymentDate).toLocaleDateString()}` : "",
    billedToName: lead.name,
    billedToCompany: lead.company || "",
    billedToEmail: lead.email,
    billedToPhone: lead.phone || "",
    projectType: lead.projectType || "Professional Services",
    paymentRef: lead.paymentReference || "N/A",
    items: [
      {
        id: "1",
        description: "Design and development services for the requested project.",
        amount: (parseBudget(lead.budget || "0")).toString()
      }
    ],
    gstApplicable: lead.gstApplicable || false,
    currency: "INR",
  };

  return <InvoiceLayout initialData={initialData} />;
}
