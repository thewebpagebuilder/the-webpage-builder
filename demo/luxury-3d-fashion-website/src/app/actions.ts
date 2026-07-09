"use server";

import { db } from "@/db";
import { 
  products, categories, reviews,
  consultations, orders, users,
  notifications, inventoryLogs,
  attendance, payrollRecords, invoices
} from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { eq, desc, like, and, sql, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// ---------- Store Front Actions ----------

export async function ensureSeeded() {
  await seedDatabase();
}

export async function getProducts(category?: string, occasion?: string, search?: string) {
  await ensureSeeded();
  try {
    const results = await db.select().from(products).where(eq(products.active, true));
    let filtered = results;
    if (category && category !== "all") {
      filtered = filtered.filter(p => p.category === category);
    }
    if (occasion && occasion !== "all") {
      filtered = filtered.filter(p => 
        p.occasion?.toLowerCase().includes(occasion.toLowerCase()) || 
        p.description.toLowerCase().includes(occasion.toLowerCase())
      );
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(s) || 
        p.description.toLowerCase().includes(s) || 
        p.fabric?.toLowerCase().includes(s) || 
        p.work?.toLowerCase().includes(s)
      );
    }
    return filtered;
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
}

export async function getAllProducts() {
  await ensureSeeded();
  try {
    return await db.select().from(products).where(eq(products.active, true)).orderBy(desc(products.createdAt));
  } catch (error) {
    return [];
  }
}

export async function getProductById(id: number) {
  await ensureSeeded();
  try {
    const res = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return res[0] || null;
  } catch (error) {
    return null;
  }
}

export async function getCategories() {
  await ensureSeeded();
  try {
    return await db.select().from(categories).orderBy(categories.name);
  } catch {
    return [
      { id: 1, name: "Kurtis", slug: "kurti", description: "", image: "", createdAt: new Date() },
      { id: 2, name: "Gowns", slug: "gown", description: "", image: "", createdAt: new Date() },
      { id: 3, name: "Lehengas", slug: "lehenga", description: "", image: "", createdAt: new Date() },
    ];
  }
}

// Legacy wrappers for storefront
export async function bookVideoCall(data: {
  customerName: string;
  customerEmail: string;
  phone: string;
  date: string;
  timeSlot: string;
  productId?: number;
  productTitle?: string;
}) {
  try {
    const res = await db.insert(consultations).values({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      phone: data.phone,
      date: data.date,
      timeSlot: data.timeSlot,
      productId: data.productId,
      productTitle: data.productTitle,
      status: "pending",
    }).returning();
    
    // Create notification for CRM + WhatsApp simulation
    await db.insert(notifications).values({
      type: "consultation_booked",
      title: "New Video Consultation",
      message: `${data.customerName} booked a video call for ${data.productTitle || "General Browse"} on ${data.date} at ${data.timeSlot}. Phone: ${data.phone}`,
      relatedId: res[0].id,
      relatedType: "consultation",
      whatsappSent: true,
    });

    return { success: true, call: res[0] };
  } catch (error) {
    console.error("Error booking video call:", error);
    return { success: false, error: "Failed to book schedule." };
  }
}

export async function placeCustomOrder(data: {
  customerName: string;
  customerEmail: string;
  phone: string;
  productTitle: string;
  pricePaid: number;
  bust?: string;
  waist?: string;
  hips?: string;
  shoulder?: string;
  height?: string;
  customNotes?: string;
  productId?: number;
  size?: string;
  quantity?: number;
}) {
  try {
    const invoiceNumber = `PP-${Date.now().toString().slice(-8)}`;
    
    const res = await db.insert(orders).values({
      invoiceNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      phone: data.phone,
      productId: data.productId || null,
      productTitle: data.productTitle,
      size: data.size || "M",
      quantity: data.quantity || 1,
      unitPrice: data.pricePaid,
      totalAmount: data.pricePaid * (data.quantity || 1),
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "confirmed",
      bust: data.bust || null,
      waist: data.waist || null,
      hips: data.hips || null,
      shoulder: data.shoulder || null,
      height: data.height || null,
      customNotes: data.customNotes || null,
      address: null,
    }).returning();
    
    await db.insert(invoices).values({
      orderId: res[0].id,
      invoiceNumber,
      subtotal: res[0].totalAmount,
      tax: 0,
      shipping: 0,
      total: res[0].totalAmount,
    });

    // Deduct stock if productId given
    if (data.productId) {
      const prod = await db.select().from(products).where(eq(products.id, data.productId)).limit(1);
      if (prod[0] && prod[0].stockQuantity !== null) {
        const newQty = Math.max(0, prod[0].stockQuantity - (data.quantity || 1));
        await db.update(products).set({ stockQuantity: newQty }).where(eq(products.id, data.productId));
        await db.insert(inventoryLogs).values({
          productId: data.productId,
          change: -(data.quantity || 1),
          reason: "sale",
          note: `Order ${invoiceNumber}`,
          newQuantity: newQty,
        });
      }
    }

    // Notification + WhatsApp
    await db.insert(notifications).values({
      type: "order_created",
      title: "New Order Received",
      message: `Order ${invoiceNumber}: ${data.productTitle} by ${data.customerName} - ₹${data.pricePaid.toLocaleString()} | Phone: ${data.phone}`,
      relatedId: res[0].id,
      relatedType: "order",
      whatsappSent: true,
    });

    return { success: true, order: res[0] };
  } catch (error) {
    console.error("Error placing custom order:", error);
    return { success: false, error: "Failed to place custom order." };
  }
}

export async function addReview(data: {
  productId?: number;
  productName: string;
  reviewerName: string;
  rating: number;
  comment: string;
}) {
  try {
    const res = await db.insert(reviews).values({
      productId: data.productId,
      productName: data.productName,
      reviewerName: data.reviewerName,
      rating: data.rating,
      comment: data.comment,
      verified: true,
    }).returning();
    
    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true, review: res[0] };
  } catch (error) {
    console.error("Error adding review:", error);
    return { success: false, error: "Failed to post review." };
  }
}

// ---------- CRM AUTH ----------

export async function crmLogin(email: string, password: string) {
  const res = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = res[0];
  if (!user || user.password !== password || !user.active) {
    return { success: false, error: "Invalid credentials" };
  }
  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));
  const cookieStore = await cookies();
  cookieStore.set("crm_user", JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export async function crmLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("crm_user");
  return { success: true };
}

export async function crmGetSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("crm_user")?.value;
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export async function crmRequireAuth(requiredRole?: "admin" | "employee") {
  const session = await crmGetSession();
  if (!session) return null;
  if (requiredRole === "admin" && session.role !== "admin") return null;
  return session;
}

// ---------- CRM PRODUCT MANAGEMENT ----------

export async function crmUpsertProduct(data: {
  id?: number;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  images?: string[];
  fabric?: string;
  work?: string;
  occasion?: string;
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  stockQuantity?: number;
  sku?: string;
  costPrice?: number;
  active?: boolean;
}) {
  const session = await crmRequireAuth("admin");
  if (!session) return { success: false, error: "Unauthorized" };

  const payload = {
    name: data.name,
    description: data.description,
    category: data.category,
    price: data.price,
    originalPrice: data.originalPrice || null,
    image: data.image,
    images: data.images || [],
    fabric: data.fabric || null,
    work: data.work || null,
    occasion: data.occasion || null,
    sizes: data.sizes || ["XS", "S", "M", "L", "XL", "XXL"],
    colors: data.colors || [],
    featured: data.featured ?? false,
    stockQuantity: data.stockQuantity ?? 25,
    sku: data.sku || `PP-${Math.random().toString(36).slice(2,8).toUpperCase()}`,
    costPrice: data.costPrice || Math.floor(data.price * 0.55),
    active: data.active ?? true,
  };

  try {
    if (data.id) {
      await db.update(products).set(payload).where(eq(products.id, data.id));
      revalidatePath("/shop");
      return { success: true, id: data.id };
    } else {
      const inserted = await db.insert(products).values(payload).returning({ id: products.id });
      revalidatePath("/shop");
      return { success: true, id: inserted[0].id };
    }
  } catch (e) {
    console.error(e);
    return { success: false, error: "Save failed" };
  }
}

export async function crmDeleteProduct(id: number) {
  const session = await crmRequireAuth("admin");
  if (!session) return { success: false, error: "Unauthorized" };
  await db.update(products).set({ active: false }).where(eq(products.id, id));
  revalidatePath("/shop");
  return { success: true };
}

// ---------- CRM ORDERS / INVOICING ----------

export async function crmListOrders() {
  const session = await crmGetSession();
  if (!session) return [];
  return await db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function crmUpdateOrderStatus(orderId: number, orderStatus: string) {
  const session = await crmGetSession();
  if (!session) return { success: false };
  await db.update(orders).set({ orderStatus }).where(eq(orders.id, orderId));
  return { success: true };
}

export async function crmCreateOrder(data: {
  customerName: string;
  customerEmail: string;
  phone: string;
  address?: string;
  productId: number;
  size: string;
  quantity: number;
}) {
  const session = await crmGetSession();
  if (!session) return { success: false, error: "Unauthorized" };
  
  const prod = await db.select().from(products).where(eq(products.id, data.productId)).limit(1);
  if (!prod[0]) return { success: false, error: "Product not found" };
  
  const unitPrice = prod[0].price;
  const totalAmount = unitPrice * data.quantity;
  const invoiceNumber = `PP-${Date.now().toString().slice(-8)}`;
  
  const inserted = await db.insert(orders).values({
    invoiceNumber,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    phone: data.phone,
    address: data.address || null,
    productId: data.productId,
    productTitle: prod[0].name,
    size: data.size,
    quantity: data.quantity,
    unitPrice,
    totalAmount,
    paymentMethod: "cod",
    paymentStatus: "pending",
    orderStatus: "confirmed",
    createdBy: session.id,
  }).returning();
  
  await db.insert(invoices).values({
    orderId: inserted[0].id,
    invoiceNumber,
    subtotal: totalAmount,
    tax: 0,
    shipping: 0,
    total: totalAmount,
  });

  // stock
  const newQty = Math.max(0, (prod[0].stockQuantity || 0) - data.quantity);
  await db.update(products).set({ stockQuantity: newQty }).where(eq(products.id, data.productId));
  await db.insert(inventoryLogs).values({
    productId: data.productId,
    userId: session.id,
    change: -data.quantity,
    reason: "sale",
    note: `CRM Order ${invoiceNumber}`,
    newQuantity: newQty,
  });

  await db.insert(notifications).values({
    type: "order_created",
    title: "CRM Order Created",
    message: `Invoice ${invoiceNumber}: ${prod[0].name} × ${data.quantity} - ₹${totalAmount.toLocaleString()}`,
    relatedId: inserted[0].id,
    relatedType: "order",
    whatsappSent: true,
  });

  return { success: true, orderId: inserted[0].id, invoiceNumber };
}

// ---------- CRM INVENTORY ----------

export async function crmAdjustStock(productId: number, change: number, reason: string, note?: string) {
  const session = await crmGetSession();
  if (!session) return { success: false };
  const p = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  if (!p[0]) return { success: false };
  const newQty = Math.max(0, (p[0].stockQuantity || 0) + change);
  await db.update(products).set({ stockQuantity: newQty }).where(eq(products.id, productId));
  await db.insert(inventoryLogs).values({
    productId, userId: session.id, change, reason, note: note || null, newQuantity: newQty,
  });
  return { success: true, newQty };
}

// ---------- CRM CONSULTATIONS ----------

export async function crmListConsultations() {
  const session = await crmGetSession();
  if (!session) return [];
  return await db.select().from(consultations).orderBy(desc(consultations.createdAt));
}

export async function crmUpdateConsultation(id: number, status: string, notes?: string) {
  const session = await crmGetSession();
  if (!session) return { success: false };
  await db.update(consultations).set({ status, notes: notes || null }).where(eq(consultations.id, id));
  return { success: true };
}

// ---------- CRM EMPLOYEES ----------

export async function crmListEmployees() {
  const session = await crmRequireAuth("admin");
  if (!session) return [];
  return await db.select().from(users).orderBy(desc(users.createdAt));
}

export async function crmUpsertEmployee(data: {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  phone?: string;
  department?: string;
  salaryMonthly?: number;
  hireDate?: string;
  active?: boolean;
}) {
  const session = await crmRequireAuth("admin");
  if (!session) return { success: false, error: "Unauthorized" };
  const payload = {
    name: data.name,
    email: data.email,
    role: data.role,
    phone: data.phone || null,
    department: data.department || null,
    salaryMonthly: data.salaryMonthly || 35000,
    hireDate: data.hireDate || null,
    active: data.active ?? true,
    ...(data.password ? { password: data.password } : {}),
  };
  try {
    if (data.id) {
      await db.update(users).set(payload).where(eq(users.id, data.id));
      return { success: true, id: data.id };
    } else {
      const inserted = await db.insert(users).values({ ...payload, password: data.password || "peach123" }).returning({ id: users.id });
      return { success: true, id: inserted[0].id };
    }
  } catch (e) {
    return { success: false, error: "Email already exists" };
  }
}

// ---------- CRM ATTENDANCE ----------

export async function crmMarkAttendance(userId: number, status: string, notes?: string) {
  const session = await crmGetSession();
  if (!session) return { success: false };
  const today = new Date().toISOString().slice(0,10);
  const existing = await db.select().from(attendance).where(and(eq(attendance.userId, userId), eq(attendance.date, today)));
  if (existing[0]) {
    await db.update(attendance).set({ status, notes: notes || null, checkOut: status !== "absent" ? new Date() : null }).where(eq(attendance.id, existing[0].id));
  } else {
    await db.insert(attendance).values({
      userId,
      date: today,
      checkIn: status !== "absent" ? new Date() : null,
      status,
      notes: notes || null,
    });
  }
  return { success: true };
}

export async function crmGetAttendance(userId?: number) {
  const session = await crmGetSession();
  if (!session) return [];
  if (userId) {
    return await db.select().from(attendance).where(eq(attendance.userId, userId)).orderBy(desc(attendance.date));
  }
  return await db.select().from(attendance).orderBy(desc(attendance.date));
}

// ---------- CRM PAYROLL ----------

export async function crmListPayroll() {
  const session = await crmRequireAuth("admin");
  if (!session) return [];
  const rows = await db.select({
    payroll: payrollRecords,
    user: users,
  }).from(payrollRecords)
    .leftJoin(users, eq(payrollRecords.userId, users.id))
    .orderBy(desc(payrollRecords.year), desc(payrollRecords.month));
  return rows;
}

export async function crmCreatePayroll(userId: number, month: number, year: number, bonus: number, deductions: number) {
  const session = await crmRequireAuth("admin");
  if (!session) return { success: false };
  const emp = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!emp[0]) return { success: false };
  const baseSalary = emp[0].salaryMonthly || 35000;
  const netPay = baseSalary + bonus - deductions;
  await db.insert(payrollRecords).values({
    userId, month, year, baseSalary, bonus, deductions, netPay, daysPresent: 26, status: "pending",
  });
  return { success: true };
}

export async function crmPayPayroll(id: number) {
  const session = await crmRequireAuth("admin");
  if (!session) return { success: false };
  await db.update(payrollRecords).set({ status: "paid", paidAt: new Date() }).where(eq(payrollRecords.id, id));
  return { success: true };
}

// ---------- CRM NOTIFICATIONS / WHATSAPP ----------

export async function crmGetNotifications() {
  const session = await crmGetSession();
  if (!session) return [];
  return await db.select().from(notifications).orderBy(desc(notifications.createdAt)).limit(80);
}

export async function crmMarkNotificationRead(id: number) {
  await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
  return { success: true };
}

// WhatsApp helper (simulation)
export async function sendWhatsApp(to: string, message: string) {
  await db.insert(notifications).values({
    type: "whatsapp_sent",
    title: `WhatsApp → ${to}`,
    message,
    whatsappSent: true,
    read: false,
  });
  return { success: true, sent: true };
}

// ---------- CRM DASHBOARD STATS ----------

export async function crmGetDashboard() {
  const session = await crmGetSession();
  if (!session) return null;

  const [productCount] = await db.select({ c: count() }).from(products);
  const [orderCount] = await db.select({ c: count() }).from(orders);
  const [consultCount] = await db.select({ c: count() }).from(consultations);
  const [userCount] = await db.select({ c: count() }).from(users);

  const recentOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(6);
  const lowStock = await db.select().from(products).where(sql`${products.stockQuantity} <= ${products.lowStockThreshold}`);

  const revenueRes = await db.select({ sum: sql<number>`coalesce(sum(${orders.totalAmount}),0)` }).from(orders);
  const revenue = Number(revenueRes[0]?.sum || 0);

  return {
    productCount: productCount.c,
    orderCount: orderCount.c,
    consultationCount: consultCount.c,
    userCount: userCount.c,
    revenue,
    recentOrders,
    lowStock,
  };
}

export async function getReviewsForProduct(productName: string) {
  try {
    const { reviews } = await import("@/db/schema");
    return await db.select().from(reviews).where(eq(reviews.productName, productName)).orderBy(desc(reviews.createdAt));
  } catch {
    return [];
  }
}
