"use client";
import { useState, useEffect } from "react";
import { formatCurrency, parseBudget } from "@/lib/leads";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  paidOn?: string;
  billedToName: string;
  billedToCompany: string;
  billedToEmail: string;
  billedToPhone: string;
  projectType: string;
  paymentRef: string;
  description: string;
  amount: string; // string so it can be edited easily
  gstApplicable: boolean;
}

interface InvoiceLayoutProps {
  initialData: InvoiceData;
  backUrl?: string;
}

export default function InvoiceLayout({ initialData, backUrl = "/admin" }: InvoiceLayoutProps) {
  const [data, setData] = useState<InvoiceData>(initialData);

  // Sync if initialData changes (e.g. loads from API)
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleChange = (field: keyof InvoiceData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const parsedAmount = parseBudget(data.amount) || parseFloat(data.amount.replace(/[^0-9.]/g, "")) || 0;
  const gstAmount = data.gstApplicable ? parsedAmount * 0.18 : 0;
  const totalAmount = parsedAmount + gstAmount;

  return (
    <div className="min-h-screen bg-zinc-100 text-black font-sans py-10 print:py-0 print:bg-white">
      {/* Top action bar - hidden in print */}
      <div className="max-w-4xl mx-auto mb-8 px-8 flex items-center justify-between print:hidden">
        <Link
          href={backUrl}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-zinc-600 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={data.gstApplicable}
              onChange={(e) => handleChange("gstApplicable", e.target.checked)}
              className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
            />
            GST Applicable
          </label>
          <button
            onClick={() => window.print()}
            className="h-10 px-6 rounded-full bg-blue-600 text-white font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Printer size={16} />
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center text-sm text-zinc-500 mb-4 print:hidden">
        💡 You can click on the text fields below to edit them before printing.
      </div>

      {/* A4 Paper Container */}
      <div className="max-w-4xl mx-auto bg-white min-h-[1122px] p-12 sm:p-16 shadow-xl print:shadow-none print:p-0 print:w-full print:max-w-none">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-zinc-200 pb-8 mb-8">
          <div>
            <div className="w-48 mb-4">
              <img src="/logo.webp" alt="The Webpage Builder Logo" className="w-full h-auto" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">THE WEBPAGE BUILDER</h1>
            {data.gstApplicable && (
              <p className="text-zinc-500 text-sm mt-1">GSTIN: 26AJMPL7829F1ZU</p>
            )}
          </div>
          <div className="text-right flex flex-col items-end gap-1">
            <h2 className="text-4xl font-light text-zinc-300 tracking-wider uppercase mb-2">Invoice</h2>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-700">Invoice No:</span> 
              <input 
                value={data.invoiceNo} 
                onChange={(e) => handleChange("invoiceNo", e.target.value)}
                className="w-32 text-right focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none px-1 -mr-1 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-700">Date:</span>
              <input 
                value={data.date} 
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-32 text-right focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none px-1 -mr-1 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mt-1">
              <input 
                value={data.paidOn || ""} 
                placeholder="e.g. PAID ON 12/08/2026"
                onChange={(e) => handleChange("paidOn", e.target.value)}
                className="w-48 text-right focus:outline-none focus:bg-emerald-50 print:bg-transparent border border-transparent hover:border-emerald-200 rounded print:border-none placeholder:text-emerald-200 px-1 -mr-1 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Client & Project Info */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-100 pb-2">Billed To</h3>
            <input 
              value={data.billedToName}
              placeholder="Client Name"
              onChange={(e) => handleChange("billedToName", e.target.value)}
              className="block w-full font-semibold text-zinc-900 focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none placeholder:font-normal placeholder:text-zinc-300 px-2 -ml-2 transition-colors"
            />
            <input 
              value={data.billedToCompany}
              placeholder="Company Name (Optional)"
              onChange={(e) => handleChange("billedToCompany", e.target.value)}
              className="block w-full mt-1 text-zinc-600 focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none placeholder:text-zinc-300 px-2 -ml-2 transition-colors"
            />
            <input 
              value={data.billedToEmail}
              placeholder="Email Address"
              onChange={(e) => handleChange("billedToEmail", e.target.value)}
              className="block w-full mt-1 text-zinc-600 focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none placeholder:text-zinc-300 px-2 -ml-2 transition-colors"
            />
            <input 
              value={data.billedToPhone}
              placeholder="Phone Number"
              onChange={(e) => handleChange("billedToPhone", e.target.value)}
              className="block w-full mt-1 text-zinc-600 focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none placeholder:text-zinc-300 px-2 -ml-2 transition-colors"
            />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-100 pb-2">Project Details</h3>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-zinc-900 w-12">Type:</span> 
              <input 
                value={data.projectType}
                placeholder="e.g. Sales Commission"
                onChange={(e) => handleChange("projectType", e.target.value)}
                className="flex-1 text-zinc-600 focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none placeholder:text-zinc-300 px-2 -ml-2 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-900 w-12">Ref:</span> 
              <input 
                value={data.paymentRef}
                placeholder="Payment Reference"
                onChange={(e) => handleChange("paymentRef", e.target.value)}
                className="flex-1 text-zinc-600 focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none placeholder:text-zinc-300 px-2 -ml-2 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <table className="w-full text-left mb-12">
          <thead>
            <tr className="border-y border-zinc-200">
              <th className="py-4 font-bold text-zinc-900 text-sm">Description</th>
              <th className="py-4 font-bold text-zinc-900 text-sm text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="border-b border-zinc-200">
            <tr>
              <td className="py-6 text-zinc-700 align-top">
                <input 
                  value={data.projectType}
                  onChange={(e) => handleChange("projectType", e.target.value)}
                  className="block w-full font-medium focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none px-2 -ml-2 transition-colors"
                />
                <textarea 
                  value={data.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="block w-full mt-1 text-sm text-zinc-500 focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none resize-none overflow-hidden px-2 -ml-2 transition-colors"
                  rows={2}
                />
              </td>
              <td className="py-6 align-top">
                <input 
                  value={data.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  className="block w-full text-right font-medium text-zinc-900 focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none px-2 -mr-2 transition-colors"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-16">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span>{formatCurrency(parsedAmount)}</span>
            </div>
            {data.gstApplicable && (
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
