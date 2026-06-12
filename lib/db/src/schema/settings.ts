import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const settingsTable = pgTable("settings", {
  id: serial("id").primaryKey(),
  instituteName: text("institute_name").notNull().default("THE GUIDE International Academy"),
  tagline: text("tagline").notNull().default("We Guide the Future Leaders"),
  logoUrl: text("logo_url"),
  phone: text("phone").default("+91 XXXXXXXXXX"),
  email: text("email").default("info@theguideacademy.com"),
  address: text("address").default("India"),
  whatsapp: text("whatsapp").default("+91XXXXXXXXXX"),
  facebook: text("facebook"),
  instagram: text("instagram"),
  linkedin: text("linkedin"),
  youtube: text("youtube"),
  heroTitle: text("hero_title").default("THE GUIDE International Academy"),
  heroSubtitle: text("hero_subtitle").default("We Guide the Future Leaders"),
  heroBannerUrl: text("hero_banner_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertSettingsSchema = createInsertSchema(settingsTable).omit({ id: true, updatedAt: true });
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settingsTable.$inferSelect;
