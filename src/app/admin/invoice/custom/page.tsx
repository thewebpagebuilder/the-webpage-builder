"use client";
import InvoiceLayout, { InvoiceData } from "@/components/admin/InvoiceLayout";

export default function CustomInvoicePage() {
  const initialData: InvoiceData = {
    invoiceNo: `INV-CUSTOM-${Math.floor(Math.random() * 10000)}`,
    date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
    paidOn: "",
    billedToName: "",
    billedToCompany: "",
    billedToEmail: "",
    billedToPhone: "",
    projectType: "Sales Commission",
    paymentRef: "",
    items: [
      {
        id: "1",
        description: "Commission for recent sales and referrals.",
        amount: "0"
      }
    ],
    gstApplicable: false,
  };

  return <InvoiceLayout initialData={initialData} />;
}
