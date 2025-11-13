import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Property schema
export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: varchar("type", { length: 20 }).notNull(), // "land" | "rental" | "retail"
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  priceType: varchar("price_type", { length: 20 }).notNull(), // "sale" | "rent_monthly"
  sizeValue: real("size_value").notNull(),
  sizeUnit: varchar("size_unit", { length: 10 }).notNull(), // "acres" | "sqft"
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull().default("Cheyyar"),
  state: varchar("state", { length: 10 }).notNull().default("TN"),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  images: jsonb("images").notNull().$type<string[]>(),
  features: jsonb("features").notNull().$type<string[]>(),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  status: varchar("status", { length: 20 }).notNull().default("available"), // "available" | "pending" | "sold"
  dateListed: timestamp("date_listed").notNull().defaultNow(),
  contactName: text("contact_name").notNull(),
  contactPhone: text("contact_phone").notNull(),
  views: integer("views").notNull().default(0),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  dateListed: true,
  views: true,
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

// Filter and search types
export const propertyFilterSchema = z.object({
  type: z.enum(["land", "rental", "retail"]).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minSize: z.number().optional(),
  maxSize: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  status: z.enum(["available", "pending", "sold"]).optional(),
  search: z.string().optional(),
  sortBy: z.enum(["price-asc", "price-desc", "size-asc", "size-desc", "date-asc", "date-desc"]).optional(),
});

export type PropertyFilter = z.infer<typeof propertyFilterSchema>;
