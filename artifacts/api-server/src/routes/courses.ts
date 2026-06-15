import { Router } from "express";
import { db, coursesTable } from "@workspace/db";
import { eq, ilike, or } from "drizzle-orm";
import {
  ListCoursesQueryParams,
  CreateCourseBody,
  GetCourseParams,
  UpdateCourseParams,
  UpdateCourseBody,
  DeleteCourseParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/courses", async (req, res) => {
  const query = ListCoursesQueryParams.safeParse(req.query);
  if (!query.success) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  const { category, featured } = query.data;
  let rows = await db.select().from(coursesTable).orderBy(coursesTable.sortOrder);

  if (category) rows = rows.filter((r) => r.category === category);
  if (featured !== undefined) rows = rows.filter((r) => r.featured === featured);

  return res.json(rows.map((r) => serializeCourse(r)));
});

router.post("/courses", async (req, res) => {
  const body = CreateCourseBody.safeParse(req.body);
  if (!body.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const [row] = await db.insert(coursesTable).values(body.data).returning();
  return res.status(201).json(serializeCourse(row));
});

router.get("/courses/:id", async (req, res) => {
  const params = GetCourseParams.safeParse(req.params);
  if (!params.success) {
    return res.status(400).json({ error: "Invalid params" });
  }

  const [row] = await db.select().from(coursesTable).where(eq(coursesTable.id, params.data.id));
  if (!row) {
    return res.status(404).json({ error: "Course not found" });
  }

  return res.json(serializeCourse(row));
});

router.patch("/courses/:id", async (req, res) => {
  const params = UpdateCourseParams.safeParse(req.params);
  const body = UpdateCourseBody.safeParse(req.body);
  if (!params.success || !body.success) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const [row] = await db
    .update(coursesTable)
    .set(body.data)
    .where(eq(coursesTable.id, params.data.id))
    .returning();

  if (!row) {
    return res.status(404).json({ error: "Course not found" });
  }

  return res.json(serializeCourse(row));
});

router.delete("/courses/:id", async (req, res) => {
  const params = DeleteCourseParams.safeParse(req.params);
  if (!params.success) {
    return res.status(400).json({ error: "Invalid params" });
  }

  await db.delete(coursesTable).where(eq(coursesTable.id, params.data.id));
  return res.json({ success: true, message: "Course deleted" });
});

function serializeCourse(c: any) {
  return {
    id: c.id,
    title: c.title,
    slug: c.slug,
    category: c.category,
    duration: c.duration,
    description: c.description,
    eligibility: c.eligibility,
    syllabus: c.syllabus,
    careerOpportunities: c.careerOpportunities,
    certificationDetails: c.certificationDetails,
    benefits: c.benefits,
    imageUrl: c.imageUrl,
    featured: c.featured,
    sortOrder: c.sortOrder,
    createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
  };
}

export default router;