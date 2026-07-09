import { db } from "@/db";
import { orders, invoices, products } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = parseInt(id, 10);
  const o = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!o[0]) return new Response("Not found", { status: 404 });
  const order = o[0];
  const inv = await db.select().from(invoices).where(eq(invoices.orderId, orderId)).limit(1);
  const invoice = inv[0];

  const orderStatus = String(order.orderStatus || 'confirmed').toUpperCase();

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<title>Invoice ${order.invoiceNumber}</title>
<style>
  body{font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; color:#1c120e; margin:0; padding:40px; background:#fffdfa}
  .wrap{max-width:760px;margin:0 auto;background:#fff;border:1px solid #e8ded8;border-radius:20px;padding:32px}
  h1{font-family: Georgia, serif; margin:0}
  .muted{color:#6b5b52;font-size:12px}
  table{width:100%;border-collapse:collapse;margin-top:18px;font-size:14px}
  th,td{padding:10px 12px;border-bottom:1px solid #eee;text-align:left}
  .right{text-align:right}
  .badge{display:inline-block;background:#fdf2ee;color:#8a5a44;border:1px solid #f3d9ce;padding:3px 8px;border-radius:999px;font-size:11px;font-weight:700}
  .totals td{font-weight:700}
  @media print{ body{padding:0} .wrap{border:none} .noprint{display:none}}
</style>
</head>
<body>
<div class="wrap">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px">
    <div>
      <h1 style="letter-spacing:.18em">PEACH PETALS</h1>
      <div class="muted">Luxurious Traditional Wear • Jaipur, Rajasthan, India</div>
      <div class="muted">boutique@peachpetals.in • +91 805-1426-888</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:12px" class="muted">INVOICE</div>
      <div style="font-size:20px;font-weight:800">${order.invoiceNumber}</div>
      <div class="muted">${new Date(order.createdAt!).toLocaleDateString("en-IN", { dateStyle: "medium" })}</div>
      <div class="badge" style="margin-top:6px">${orderStatus}</div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:24px;font-size:13px">
    <div>
      <div class="muted" style="text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:4px">Bill To</div>
      <div style="font-weight:700">${order.customerName}</div>
      <div>${order.customerEmail}</div>
      <div>${order.phone}</div>
      <div>${order.address || ""}</div>
    </div>
    <div style="text-align:right">
      <div class="muted">Payment Method</div>
      <div style="font-weight:700;text-transform:uppercase">${order.paymentMethod}</div>
      <div class="muted" style="margin-top:6px">Payment Status</div>
      <div style="font-weight:700;text-transform:uppercase">${order.paymentStatus}</div>
    </div>
  </div>

  <table>
    <thead><tr><th>Description</th><th>Size</th><th class="right">Qty</th><th class="right">Unit Price</th><th class="right">Amount</th></tr></thead>
    <tbody>
      <tr>
        <td>${order.productTitle}</td>
        <td>${order.size || "-"}</td>
        <td class="right">${order.quantity}</td>
        <td class="right">₹${order.unitPrice.toLocaleString("en-IN")}</td>
        <td class="right">₹${order.totalAmount.toLocaleString("en-IN")}</td>
      </tr>
      ${order.bust ? `<tr><td colspan="5" class="muted">Custom Measurements – Bust: ${order.bust}, Waist: ${order.waist}, Hips: ${order.hips}, Shoulder: ${order.shoulder}, Height: ${order.height} ${order.customNotes ? " • " + order.customNotes : ""}</td></tr>` : ""}
      <tr class="totals"><td colspan="4" class="right">Subtotal</td><td class="right">₹${(invoice?.subtotal||order.totalAmount).toLocaleString("en-IN")}</td></tr>
      <tr><td colspan="4" class="right">Tax</td><td class="right">₹${(invoice?.tax||0).toLocaleString("en-IN")}</td></tr>
      <tr><td colspan="4" class="right">Shipping</td><td class="right">₹${(invoice?.shipping||0).toLocaleString("en-IN")}</td></tr>
      <tr class="totals"><td colspan="4" class="right">Grand Total</td><td class="right">₹${(invoice?.total||order.totalAmount).toLocaleString("en-IN")}</td></tr>
    </tbody>
  </table>

  <p class="muted" style="margin-top:18px">Thank you for shopping with Peach Petals! Complimentary custom tailoring included. Returns accepted within 7 days in original packaging.</p>
  <button onclick="window.print()" class="noprint" style="margin-top:10px;padding:10px 16px;border-radius:12px;border:1px solid #ddd;background:#fff;cursor:pointer">Print / Save PDF</button>
</div>
<script>window.print && setTimeout(()=>window.print(), 400)</script>
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
