import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const certificatesTable = pgTable("certificates", {
  id: serial("id").primaryKey(),
  certificateNumber: text("certificate_number").notNull().unique(),
  studentName: text("student_name").notNull(),
  studentPhotoUrl: text("student_photo_url"),
  courseName: text("course_name").notNull(),
  completionDate: text("completion_date").notNull(),
  grade: text("grade").notNull(),
  status: text("status").notNull().default("valid"),
  studentId: integer("student_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCertificateSchema = createInsertSchema(certificatesTable).omit({ id: true, createdAt: true });
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificatesTable.$inferSelect;
