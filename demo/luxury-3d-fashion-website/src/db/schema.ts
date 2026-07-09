import { pgTable, serial, varchar, integer, text, boolean, timestamp, jsonb, date, numeric } from "drizzle-orm/pg-core";

// ---------- STORE FRONT ----------

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  image: text("image").notNull(),
  images: jsonb("images").$type<string[]>(),
  fabric: varchar("fabric", { length: 100 }),
  work: varchar("work", { length: 255 }),
  occasion: varchar("occasion", { length: 100 }),
  rating: integer("rating").default(5),
  reviewsCount: integer("reviews_count").default(12),
  sizes: jsonb("sizes").$type<string[]>().default(["XS", "S", "M", "L", "XL", "XXL", "3XL"]),
  colors: jsonb("colors").$type<string[]>().default([]),
  featured: boolean("featured").default(false),
  // CRM / Inventory
  sku: varchar("sku", { length: 64 }),
  stockQuantity: integer("stock_quantity").default(25),
  lowStockThreshold: integer("low_stock_threshold").default(5),
  costPrice: integer("cost_price"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id"),
  productName: varchar("product_name", { length: 255 }).notNull(),
  reviewerName: varchar("reviewer_name", { length: 255 }).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  verified: boolean("verified").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------- CRM CORE ----------

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(), // plain demo – in prod use bcrypt
  role: varchar("role", { length: 30 }).notNull().default("employee"), // 'admin' | 'employee'
  phone: varchar("phone", { length: 40 }),
  avatar: text("avatar"),
  department: varchar("department", { length: 100 }),
  salaryMonthly: integer("salary_monthly").default(35000),
  hireDate: date("hire_date"),
  active: boolean("active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: date("date").notNull(),
  checkIn: timestamp("check_in"),
  checkOut: timestamp("check_out"),
  status: varchar("status", { length: 30 }).default("present"), // present, absent, half_day, late
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payrollRecords = pgTable("payroll_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  baseSalary: integer("base_salary").notNull(),
  bonus: integer("bonus").default(0),
  deductions: integer("deductions").default(0),
  netPay: integer("net_pay").notNull(),
  daysPresent: integer("days_present").default(22),
  status: varchar("status", { length: 30 }).default("pending"), // pending, paid
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inventoryLogs = pgTable("inventory_logs", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  userId: integer("user_id"),
  change: integer("change").notNull(), // +in / -out
  reason: varchar("reason", { length: 120 }).notNull(), // sale, restock, adjustment, return
  note: text("note"),
  newQuantity: integer("new_quantity"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Orders – upgraded from custom_orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  invoiceNumber: varchar("invoice_number", { length: 64 }),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  address: text("address"),
  productId: integer("product_id"),
  productTitle: varchar("product_title", { length: 255 }).notNull(),
  size: varchar("size", { length: 32 }),
  quantity: integer("quantity").default(1),
  unitPrice: integer("unit_price").notNull(),
  totalAmount: integer("total_amount").notNull(),
  paymentMethod: varchar("payment_method", { length: 40 }).default("cod"),
  paymentStatus: varchar("payment_status", { length: 30 }).default("pending"),
  orderStatus: varchar("order_status", { length: 40 }).default("confirmed"), // confirmed, tailoring, shipped, delivered, cancelled
  // custom tailoring measurements
  bust: varchar("bust", { length: 20 }),
  waist: varchar("waist", { length: 20 }),
  hips: varchar("hips", { length: 20 }),
  shoulder: varchar("shoulder", { length: 20 }),
  height: varchar("height", { length: 20 }),
  customNotes: text("custom_notes"),
  createdBy: integer("created_by"), // userId if placed via CRM
  createdAt: timestamp("created_at").defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  invoiceNumber: varchar("invoice_number", { length: 64 }).notNull(),
  subtotal: integer("subtotal").notNull(),
  tax: integer("tax").default(0),
  shipping: integer("shipping").default(0),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Consultations (video_calls)
export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  timeSlot: varchar("time_slot", { length: 50 }).notNull(),
  productId: integer("product_id"),
  productTitle: varchar("product_title", { length: 255 }),
  status: varchar("status", { length: 50 }).default("pending"),
  notes: text("notes"),
  assignedTo: integer("assigned_to"),
  createdAt: timestamp("created_at").defaultNow(),
});

// CRM notifications / WhatsApp log
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 60 }).notNull(), // order_created, consultation_booked, low_stock, whatsapp_sent
  title: varchar("title", { length: 200 }).notNull(),
  message: text("message").notNull(),
  relatedId: integer("related_id"),
  relatedType: varchar("related_type", { length: 60 }),
  read: boolean("read").default(false),
  whatsappSent: boolean("whatsapp_sent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Backwards compatibility exports for old code
export const videoCalls = consultations;
export const customOrders = orders;

// Types
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type User = typeof users.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Consultation = typeof consultations.$inferSelect;
