"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLeadById, getFirestoreErrorMessage, parseBudget, type Lead } from "@/lib/leads";
import InvoiceLayout, { InvoiceData } from "@/components/admin/InvoiceLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";

function InvoiceContent() {
  const { id } = useParams();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLead() {
      try {
        const leadId = Array.isArray(id) ? id[0] : id;
        if (!leadId) {
          setLoading(false);
          return;
        }
        const found = await getLeadById(leadId);
        if (found) {
          setLead(found);
        }
      } catch (err) {
        console.error("Failed to load lead for invoice:", err);
        setError(getFirestoreErrorMessage(err, "Failed to load lead details from Firestore."));
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadLead();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="animate-spin w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-red-400 p-6 text-center">
        <p className="max-w-md text-sm">{error}</p>
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
    invoiceType: "billed",
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

export default function InvoicePage() {
  return (
    <ProtectedRoute>
      <InvoiceContent />
    </ProtectedRoute>
  );
}
