import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const testimonialsTable = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  photoUrl: text("photo_url"),
  courseName: text("course_name").notNull(),
  rating: integer("rating").notNull().default(5),
  review: text("review").notNull(),
  designation: text("designation"),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonialsTable).omit({ id: true, createdAt: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonialsTable.$inferSelect;
