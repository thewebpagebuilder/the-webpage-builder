"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLeads, type Lead } from "@/lib/leads";
import { formatCurrency, parseBudget } from "@/lib/leads";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

  const budgetAmount = parseBudget(lead.budget || "0");
  const gstAmount = lead.gstApplicable ? budgetAmount * 0.18 : 0;
  const totalAmount = budgetAmount + gstAmount;

  return (
    <div className="min-h-screen bg-zinc-100 text-black font-sans py-10 print:py-0 print:bg-white">
      {/* Top action bar - hidden in print */}
      <div className="max-w-4xl mx-auto mb-8 px-8 flex items-center justify-between print:hidden">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Admin
        </Link>
        <button
          onClick={() => window.print()}
          className="h-10 px-6 rounded-full bg-blue-600 text-white font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Printer size={16} />
          Print / Save PDF
        </button>
      </div>

      {/* A4 Paper Container */}
      <div className="max-w-4xl mx-auto bg-white min-h-[1122px] p-12 sm:p-16 shadow-xl print:shadow-none print:p-0 print:w-full print:max-w-none">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-zinc-200 pb-8 mb-8">
          <div>
            <div className="w-48 mb-4">
              {/* Note: In production, ensure /logo.webp exists in public dir */}
              <img src="/logo.webp" alt="The Webpage Builder Logo" className="w-full h-auto" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">THE WEBPAGE BUILDER</h1>
            {lead.gstApplicable && (
              <p className="text-zinc-500 text-sm mt-1">GSTIN: 26AJMPL7829F1ZU</p>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-light text-zinc-300 tracking-wider uppercase mb-2">Invoice</h2>
            <p className="text-sm text-zinc-500"><span className="font-semibold text-zinc-700">Invoice No:</span> INV-{lead.id}</p>
            <p className="text-sm text-zinc-500"><span className="font-semibold text-zinc-700">Date:</span> {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            {lead.paymentDate && (
              <p className="text-sm text-emerald-600 font-medium mt-2">PAID ON {new Date(lead.paymentDate).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        {/* Client & Project Info */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-100 pb-2">Billed To</h3>
            <p className="font-semibold text-zinc-900">{lead.name}</p>
            {lead.company && <p className="text-zinc-600">{lead.company}</p>}
            <p className="text-zinc-600">{lead.email}</p>
            {lead.phone && <p className="text-zinc-600">{lead.phone}</p>}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-100 pb-2">Project Details</h3>
            <p className="text-zinc-600"><span className="font-semibold text-zinc-900">Type:</span> {lead.projectType || "Web Development"}</p>
            <p className="text-zinc-600"><span className="font-semibold text-zinc-900">Ref:</span> {lead.paymentReference || "N/A"}</p>
          </div>
        </div>

        {/* Invoice Items */}
        <table className="w-full text-left mb-12">
          <thead>
            <tr className="border-y border-zinc-200">
              <th className="py-4 font-bold text-zinc-900 text-sm">Description</th>
              <th className="py-4 font-bold text-zinc-900 text-sm text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="border-b border-zinc-200">
            <tr>
              <td className="py-6 text-zinc-700">
                <p className="font-medium">{lead.projectType || "Professional Services"}</p>
                <p className="text-sm text-zinc-500 mt-1">Design and development services for the requested project.</p>
              </td>
              <td className="py-6 text-zinc-900 text-right font-medium">{formatCurrency(budgetAmount)}</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-16">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span>{formatCurrency(budgetAmount)}</span>
            </div>
            {lead.gstApplicable && (
              <div className="flex justify-between text-zinc-600">
                <span>GST (18%)</span>
                <span>{formatCurrency(gstAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-zinc-900 border-t border-zinc-200 pt-3">
              <span>Total</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="mt-auto border-t border-zinc-200 pt-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Payment Information (Bank Transfer)</h3>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="mb-1"><span className="text-zinc-500 inline-block w-24">Bank Name:</span> <span className="font-semibold text-zinc-900">HDFC</span></p>
              <p className="mb-1"><span className="text-zinc-500 inline-block w-24">Account Name:</span> <span className="font-semibold text-zinc-900">THE WEBPAGE BUILDER</span></p>
            </div>
            <div>
              <p className="mb-1"><span className="text-zinc-500 inline-block w-24">Account No:</span> <span className="font-semibold text-zinc-900">50200124273451</span></p>
              <p className="mb-1"><span className="text-zinc-500 inline-block w-24">IFSC Code:</span> <span className="font-semibold text-zinc-900">HDFC0000074</span></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-zinc-400">
          <p>Thank you for your business!</p>
          <p>If you have any questions concerning this invoice, contact us.</p>
        </div>

      </div>
    </div>
  );
}
