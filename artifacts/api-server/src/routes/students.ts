import { Router, type IRouter } from "express";
import { db, studentsTable } from "@workspace/db";
import { eq, ilike, or, count, sql } from "drizzle-orm";
import {
  ListStudentsQueryParams,
  CreateStudentBody,
  BulkImportStudentsBody,
  GetStudentParams,
  UpdateStudentParams,
  UpdateStudentBody,
  DeleteStudentParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/students", async (req, res) => {
  const query = ListStudentsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "Invalid query" });
    return;
  }
  const { search, page = 1, limit = 20 } = query.data;
  const offset = (page - 1) * limit;

  let rows = await db.select().from(studentsTable).orderBy(studentsTable.createdAt);

  if (search) {
    const s = search.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.certificateNumber.toLowerCase().includes(s) ||
        r.courseName.toLowerCase().includes(s)
    );
  }

  const total = rows.length;
  const data = rows.slice(offset, offset + limit);

  res.json({ data: data.map(serializeStudent), total, page, limit });
});

router.post("/students/bulk-import", async (req, res) => {
  const body = BulkImportStudentsBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  let imported = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const record of body.data.records) {
    try {
      await db.insert(studentsTable).values({
        name: record.name,
        photoUrl: record.photoUrl ?? null,
        certificateNumber: record.certificateNumber,
        courseName: record.courseName,
        completionDate: record.completionDate,
        grade: record.grade,
        status: record.status ?? "active",
        email: record.email ?? null,
        phone: record.phone ?? null,
      });
      imported++;
    } catch (err) {
      failed++;
      errors.push(`Row ${imported + failed}: ${(err as Error).message}`);
    }
  }

  res.json({ imported, failed, total: body.data.records.length, errors });
});

router.post("/students", async (req, res) => {
  const body = CreateStudentBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const [row] = await db.insert(studentsTable).values(body.data).returning();
  res.status(201).json(serializeStudent(row));
});

router.get("/students/:id", async (req, res) => {
  const params = GetStudentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }
  const [row] = await db.select().from(studentsTable).where(eq(studentsTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "Student not found" });
    return;
  }
  res.json(serializeStudent(row));
});

router.patch("/students/:id", async (req, res) => {
  const params = UpdateStudentParams.safeParse(req.params);
  const body = UpdateStudentBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const [row] = await db
    .update(studentsTable)
    .set(body.data)
    .where(eq(studentsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Student not found" });
    return;
  }
  res.json(serializeStudent(row));
});

router.delete("/students/:id", async (req, res) => {
  const params = DeleteStudentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }
  await db.delete(studentsTable).where(eq(studentsTable.id, params.data.id));
  res.json({ success: true, message: "Student deleted" });
});

function serializeStudent(s: typeof studentsTable.$inferSelect) {
  return {
    id: s.id,
    name: s.name,
    photoUrl: s.photoUrl,
    certificateNumber: s.certificateNumber,
    courseName: s.courseName,
    completionDate: s.completionDate,
    grade: s.grade,
    status: s.status,
    email: s.email,
    phone: s.phone,
    createdAt: s.createdAt.toISOString(),
  };
}

export default router;
