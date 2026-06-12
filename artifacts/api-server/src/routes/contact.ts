import { Router, type IRouter } from "express";
import { db, contactInquiriesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListInquiriesQueryParams,
  CreateInquiryBody,
  ResolveInquiryParams,
  ResolveInquiryBody,
  DeleteInquiryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/contact", async (req, res) => {
  const query = ListInquiriesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "Invalid query" });
    return;
  }
  const { status } = query.data;
  let rows = await db.select().from(contactInquiriesTable).orderBy(contactInquiriesTable.createdAt);
  if (status) rows = rows.filter((r) => r.status === status);
  res.json(rows.map(serializeInquiry));
});

router.post("/contact", async (req, res) => {
  const body = CreateInquiryBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const [row] = await db.insert(contactInquiriesTable).values(body.data).returning();
  res.status(201).json(serializeInquiry(row));
});

router.patch("/contact/:id/resolve", async (req, res) => {
  const params = ResolveInquiryParams.safeParse(req.params);
  const body = ResolveInquiryBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const [row] = await db
    .update(contactInquiriesTable)
    .set({ status: body.data.status })
    .where(eq(contactInquiriesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Inquiry not found" });
    return;
  }
  res.json(serializeInquiry(row));
});

router.delete("/contact/:id", async (req, res) => {
  const params = DeleteInquiryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }
  await db.delete(contactInquiriesTable).where(eq(contactInquiriesTable.id, params.data.id));
  res.json({ success: true, message: "Inquiry deleted" });
});

function serializeInquiry(i: typeof contactInquiriesTable.$inferSelect) {
  return {
    id: i.id,
    name: i.name,
    email: i.email,
    phone: i.phone,
    subject: i.subject,
    message: i.message,
    courseInterest: i.courseInterest,
    status: i.status,
    createdAt: i.createdAt.toISOString(),
  };
}

export default router;
