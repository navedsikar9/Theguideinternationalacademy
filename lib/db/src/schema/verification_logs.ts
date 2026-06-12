import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const verificationLogsTable = pgTable("verification_logs", {
  id: serial("id").primaryKey(),
  certificateNumber: text("certificate_number").notNull(),
  found: boolean("found").notNull().default(false),
  ipAddress: text("ip_address"),
  verifiedAt: timestamp("verified_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertVerificationLogSchema = createInsertSchema(verificationLogsTable).omit({ id: true, verifiedAt: true });
export type InsertVerificationLog = z.infer<typeof insertVerificationLogSchema>;
export type VerificationLog = typeof verificationLogsTable.$inferSelect;
