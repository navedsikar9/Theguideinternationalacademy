import { Router, type IRouter } from "express";
import { db, certificatesTable, verificationLogsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListCertificatesQueryParams,
  CreateCertificateBody,
  VerifyCertificateQueryParams,
  UpdateCertificateParams,
  UpdateCertificateBody,
  DeleteCertificateParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/certificates", async (req, res) => {
  const query = ListCertificatesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "Invalid query" });
    return;
  }
  const { search, page = 1, limit = 20 } = query.data;
  const offset = (page - 1) * limit;

  let rows = await db.select().from(certificatesTable).orderBy(certificatesTable.createdAt);

  if (search) {
    const s = search.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.certificateNumber.toLowerCase().includes(s) ||
        r.studentName.toLowerCase().includes(s) ||
        r.courseName.toLowerCase().includes(s)
    );
  }

  const total = rows.length;
  const data = rows.slice(offset, offset + limit);
  res.json({ data: data.map(serializeCert), total, page, limit });
});

router.get("/certificates/verify", async (req, res) => {
  const query = VerifyCertificateQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "Certificate number required" });
    return;
  }

  const { number } = query.data;
  const [cert] = await db
    .select()
    .from(certificatesTable)
    .where(eq(certificatesTable.certificateNumber, number));

  const found = !!cert;
  const ipAddress = req.ip ?? null;
  await db.insert(verificationLogsTable).values({ certificateNumber: number, found, ipAddress });

  if (found) {
    res.json({ found: true, certificate: serializeCert(cert), verifiedAt: new Date().toISOString() });
  } else {
    res.json({ found: false, verifiedAt: new Date().toISOString() });
  }
});

router.post("/certificates", async (req, res) => {
  const body = CreateCertificateBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const [row] = await db.insert(certificatesTable).values(body.data).returning();
  res.status(201).json(serializeCert(row));
});

router.patch("/certificates/:id", async (req, res) => {
  const params = UpdateCertificateParams.safeParse(req.params);
  const body = UpdateCertificateBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const [row] = await db
    .update(certificatesTable)
    .set(body.data)
    .where(eq(certificatesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Certificate not found" });
    return;
  }
  res.json(serializeCert(row));
});

router.delete("/certificates/:id", async (req, res) => {
  const params = DeleteCertificateParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }
  await db.delete(certificatesTable).where(eq(certificatesTable.id, params.data.id));
  res.json({ success: true, message: "Certificate deleted" });
});

function serializeCert(c: typeof certificatesTable.$inferSelect) {
  return {
    id: c.id,
    certificateNumber: c.certificateNumber,
    studentName: c.studentName,
    studentPhotoUrl: c.studentPhotoUrl,
    courseName: c.courseName,
    completionDate: c.completionDate,
    grade: c.grade,
    status: c.status,
    studentId: c.studentId,
    createdAt: c.createdAt.toISOString(),
  };
}

export default router;
