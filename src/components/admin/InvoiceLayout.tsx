"use client";
import { useState, useEffect } from "react";
import { parseBudget } from "@/lib/leads";
import { Printer, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export interface InvoiceItem {
  id: string;
  description: string;
  amount: string;
}

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
  items: InvoiceItem[];
  gstApplicable: boolean;
  currency: string;
}

interface InvoiceLayoutProps {
  initialData: InvoiceData;
  backUrl?: string;
}

export default function InvoiceLayout({ initialData, backUrl = "/admin" }: InvoiceLayoutProps) {
  const [data, setData] = useState<InvoiceData>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleChange = (field: keyof InvoiceData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    handleChange("items", newItems);
  };

  const addItem = () => {
    handleChange("items", [...data.items, { id: Math.random().toString(), description: "", amount: "0" }]);
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    handleChange("items", newItems);
  };

  const parsedSubtotal = data.items.reduce((sum, item) => {
    const val = parseBudget(item.amount) || parseFloat(item.amount.replace(/[^0-9.]/g, "")) || 0;
    return sum + val;
  }, 0);
  
  const gstAmount = data.gstApplicable ? parsedSubtotal * 0.18 : 0;
  const totalAmount = parsedSubtotal + gstAmount;

  const formatInvoiceCurrency = (amount: number) => {
    return new Intl.NumberFormat(data.currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency: data.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Determine currency symbol for the column header
  const getCurrencySymbol = () => {
    const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: data.currency });
    const parts = formatter.formatToParts(1);
    const symbolPart = parts.find(part => part.type === "currency");
    return symbolPart ? symbolPart.value : data.currency;
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-black font-sans py-10 print:py-0 print:bg-white flex flex-col items-center">
      
      {/* Top Back Button */}
      <div className="w-full max-w-4xl px-8 mb-4 print:hidden self-start">
        <Link
          href={backUrl}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      <div className="text-center text-sm text-zinc-500 mb-4 print:hidden w-full">
        💡 You can click on the text fields below to edit them before printing.
      </div>

      {/* A4 Paper Container */}
      <div className="w-full max-w-4xl bg-white min-h-[1122px] p-12 sm:p-16 shadow-xl print:shadow-none print:p-0 print:w-full print:max-w-none relative mb-12">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-zinc-200 pb-8 mb-8">
          <div>
            <div className="w-48 mb-4">
              <img src="/invoice-logo.png" alt="The Webpage Builder Logo" className="w-full h-auto object-contain max-h-24" onError={(e) => { e.currentTarget.src = "/logo.webp"; }} />
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
        <div className="mb-12">
          <table className="w-full text-left mb-2">
            <thead>
              <tr className="border-y border-zinc-200">
                <th className="py-4 font-bold text-zinc-900 text-sm w-12">Sr.</th>
                <th className="py-4 font-bold text-zinc-900 text-sm">Description</th>
                <th className="py-4 font-bold text-zinc-900 text-sm text-right w-32">Amount ({getCurrencySymbol()})</th>
                <th className="py-4 w-10 print:hidden"></th>
              </tr>
            </thead>
            <tbody className="border-b border-zinc-200">
              {data.items.map((item, index) => (
                <tr key={item.id} className="group">
                  <td className="py-4 align-top text-zinc-600 font-medium">
                    {index + 1}.
                  </td>
                  <td className="py-4 align-top text-zinc-700">
                    <textarea 
                      value={item.description}
                      placeholder="Item description..."
                      onChange={(e) => handleItemChange(index, "description", e.target.value)}
                      className="block w-full text-sm focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none overflow-hidden resize-none px-2 -ml-2 transition-colors"
                      style={{ fieldSizing: "content" } as any} // Modern CSS to auto-grow
                      rows={1}
                    />
                  </td>
                  <td className="py-4 align-top">
                    <input 
                      value={item.amount}
                      onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                      className="block w-full text-right font-medium text-zinc-900 focus:outline-none focus:bg-zinc-50 print:bg-transparent border border-transparent hover:border-zinc-200 rounded print:border-none px-2 -mr-2 transition-colors"
                    />
                  </td>
                  <td className="py-4 align-top text-right print:hidden">
                    <button 
                      onClick={() => removeItem(index)}
                      className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button 
            onClick={addItem}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors print:hidden"
          >
            <Plus size={16} /> Add Line Item
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-16">
          <div className="w-80 space-y-3">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span>{formatInvoiceCurrency(parsedSubtotal)}</span>
            </div>
            {data.gstApplicable && (
              <div className="flex justify-between text-zinc-600">
                <span>GST (18%)</span>
                <span>{formatInvoiceCurrency(gstAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-zinc-900 border-t border-zinc-200 pt-3">
              <span>Total</span>
              <span>{formatInvoiceCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="mt-auto border-t border-zinc-200 pt-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Payment Information (Bank Transfer)</h3>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="mb-2 flex whitespace-nowrap"><span className="text-zinc-500 w-24 flex-shrink-0">Bank Name:</span> <span className="font-semibold text-zinc-900 truncate">HDFC</span></p>
              <p className="mb-2 flex whitespace-nowrap"><span className="text-zinc-500 w-24 flex-shrink-0">Account Name:</span> <span className="font-semibold text-zinc-900 truncate">THE WEBPAGE BUILDER</span></p>
            </div>
            <div>
              <p className="mb-2 flex whitespace-nowrap"><span className="text-zinc-500 w-24 flex-shrink-0">Account No:</span> <span className="font-semibold text-zinc-900 truncate">50200124273451</span></p>
              <p className="mb-2 flex whitespace-nowrap"><span className="text-zinc-500 w-24 flex-shrink-0">IFSC Code:</span> <span className="font-semibold text-zinc-900 truncate">HDFC0000074</span></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-zinc-400">
          <p>Thank you for your business!</p>
          <p>If you have any questions concerning this invoice, contact us.</p>
        </div>
      </div>

      {/* Floating Action Bar at the Bottom for easy access */}
      <div className="w-full max-w-4xl bg-white border border-zinc-200 rounded-2xl shadow-xl p-4 flex items-center justify-between print:hidden sticky bottom-6 z-50">
        <div className="flex items-center gap-6 ml-2">
          <label className="flex items-center gap-2 text-sm text-zinc-700 font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={data.gstApplicable}
              onChange={(e) => handleChange("gstApplicable", e.target.checked)}
              className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            GST Applicable
          </label>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-zinc-700">Currency:</span>
            <select
              value={data.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1.5 font-medium"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="h-12 px-8 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md"
        >
          <Printer size={18} />
          Print / Save PDF
        </button>
      </div>
      
    </div>
  );
}
