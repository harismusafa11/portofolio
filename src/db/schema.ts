import { pgTable, serial, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";

// 1. Admin Account Table
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Banner Promo & Voucher Table
export const promos = pgTable("promos", {
  id: serial("id").primaryKey(),
  serviceId: varchar("service_id", { length: 100 }).default("basic"),
  title: text("title").notNull(),
  badgeText: varchar("badge_text", { length: 100 }).notNull().default("PROMO SPESIAL PERDANA"),
  discountAmount: integer("discount_amount").notNull().default(500000),
  originalPrice: integer("original_price").notNull().default(1999000),
  promoPrice: integer("promo_price").notNull().default(1499000),
  slotsRemaining: integer("slots_remaining").notNull().default(2),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 3. Services & Pricing Packages Table
export const services = pgTable("services", {
  id: varchar("id", { length: 100 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  priceMin: integer("price_min").notNull(),
  priceMax: integer("price_max").notNull(),
  originalPrice: integer("original_price"),
  isPromoActive: boolean("is_promo_active").notNull().default(false),
  baseDays: integer("base_days").notNull(),
  desc: text("desc").notNull(),
  featuresJson: text("features_json").notNull(),
  isPopular: boolean("is_popular").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
});

// 4. Portfolio Projects Table
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  categoryLabel: varchar("category_label", { length: 100 }).notNull(),
  description: text("description").notNull(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  techStackJson: text("tech_stack_json").notNull(),
  imageUrl: text("image_url").notNull(),
  liveUrl: text("live_url"),
  isFeatured: boolean("is_featured").notNull().default(false),
});

// 5. Blog Articles & Insights Table
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  readTime: varchar("read_time", { length: 50 }).notNull(),
  author: varchar("author", { length: 100 }).notNull().default("Haris Musafa"),
  summary: text("summary").notNull(),
  contentJson: text("content_json").notNull(),
  imageUrl: text("image_url").notNull(),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 6. Testimonials Table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientRole: varchar("client_role", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  metric: varchar("metric", { length: 100 }).notNull(),
  review: text("review").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").notNull().default(true),
});

// 7. FAQ Table
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  faqId: varchar("faq_id", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

// 8. WA Orders & Leads Log Table
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  packageTitle: varchar("package_title", { length: 255 }).notNull(),
  notes: text("notes"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 9. Full Dynamic Orders Table
export const orders = pgTable("orders", {
  id: varchar("id", { length: 100 }).primaryKey(), // e.g. ORD-2026-X91
  userId: varchar("user_id", { length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  userEmail: varchar("user_email", { length: 255 }).notNull(),
  userPhoto: text("user_photo"),
  packageId: varchar("package_id", { length: 100 }).notNull(), // basic, advanced, business, ecommerce
  packageName: varchar("package_name", { length: 255 }).notNull(),
  totalPrice: integer("total_price").notNull(),
  dpAmount: integer("dp_amount").notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull().default("manual_transfer"), // manual_transfer, paywuz
  status: varchar("status", { length: 50 }).notNull().default("pending_dp"), // pending_dp, dp_verified, design_phase, dev_phase, revision_phase, completed
  formDataJson: text("form_data_json").notNull(), // JSON string storing all wizard fields
  receiptUrl: text("receipt_url"), // Cloudinary receipt image URL
  paywuzTrxId: varchar("paywuz_trx_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 10. Project Logs Table for Live Progress Timeline
export const projectLogs = pgTable("project_logs", {
  id: serial("id").primaryKey(),
  orderId: varchar("order_id", { length: 100 }).notNull(),
  statusTag: varchar("status_tag", { length: 50 }).notNull(),
  logText: text("log_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 11. Visitor Analytics & Real-Time Tracking Table
export const visitorLogs = pgTable("visitor_logs", {
  id: serial("id").primaryKey(),
  visitorId: varchar("visitor_id", { length: 100 }).notNull(),
  pagePath: varchar("page_path", { length: 255 }).notNull(),
  deviceType: varchar("device_type", { length: 50 }).notNull().default("desktop"), // desktop, mobile, tablet
  city: varchar("city", { length: 255 }).default("Indonesia"),
  userAgent: text("user_agent"),
  lastPingAt: timestamp("last_ping_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
