import { Router, type IRouter } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListTestimonialsQueryParams,
  CreateTestimonialBody,
  UpdateTestimonialParams,
  UpdateTestimonialBody,
  DeleteTestimonialParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (req, res) => {
  const query = ListTestimonialsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "Invalid query" });
    return;
  }
  const { approved } = query.data;
  let rows = await db.select().from(testimonialsTable).orderBy(testimonialsTable.createdAt);
  if (approved !== undefined) rows = rows.filter((r) => r.approved === approved);
  res.json(rows.map(serializeTestimonial));
});

router.post("/testimonials", async (req, res) => {
  const body = CreateTestimonialBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const [row] = await db.insert(testimonialsTable).values(body.data).returning();
  res.status(201).json(serializeTestimonial(row));
});

router.patch("/testimonials/:id", async (req, res) => {
  const params = UpdateTestimonialParams.safeParse(req.params);
  const body = UpdateTestimonialBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const [row] = await db
    .update(testimonialsTable)
    .set(body.data)
    .where(eq(testimonialsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }
  res.json(serializeTestimonial(row));
});

router.delete("/testimonials/:id", async (req, res) => {
  const params = DeleteTestimonialParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, params.data.id));
  res.json({ success: true, message: "Testimonial deleted" });
});

function serializeTestimonial(t: typeof testimonialsTable.$inferSelect) {
  return {
    id: t.id,
    studentName: t.studentName,
    photoUrl: t.photoUrl,
    courseName: t.courseName,
    rating: t.rating,
    review: t.review,
    designation: t.designation,
    approved: t.approved,
    createdAt: t.createdAt.toISOString(),
  };
}

export default router;
