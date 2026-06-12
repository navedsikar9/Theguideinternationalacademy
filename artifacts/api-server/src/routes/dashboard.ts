import { Router, type IRouter } from "express";
import { db, studentsTable, certificatesTable, coursesTable, contactInquiriesTable, verificationLogsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/dashboard/stats", async (_req, res) => {
  const [students, certificates, courses, inquiries, pending, recentVerifs] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(studentsTable),
    db.select({ count: sql<number>`count(*)::int` }).from(certificatesTable),
    db.select({ count: sql<number>`count(*)::int` }).from(coursesTable),
    db.select({ count: sql<number>`count(*)::int` }).from(contactInquiriesTable),
    db.select({ count: sql<number>`count(*)::int` }).from(contactInquiriesTable).where(eq(contactInquiriesTable.status, "pending")),
    db.select({ count: sql<number>`count(*)::int` }).from(verificationLogsTable),
  ]);

  res.json({
    totalStudents: students[0]?.count ?? 0,
    totalCertificates: certificates[0]?.count ?? 0,
    totalCourses: courses[0]?.count ?? 0,
    totalInquiries: inquiries[0]?.count ?? 0,
    pendingInquiries: pending[0]?.count ?? 0,
    recentVerificationsCount: recentVerifs[0]?.count ?? 0,
  });
});

router.get("/dashboard/recent-verifications", async (_req, res) => {
  const rows = await db
    .select()
    .from(verificationLogsTable)
    .orderBy(desc(verificationLogsTable.verifiedAt))
    .limit(20);
  res.json(
    rows.map((v) => ({
      id: v.id,
      certificateNumber: v.certificateNumber,
      found: v.found,
      ipAddress: v.ipAddress,
      verifiedAt: v.verifiedAt.toISOString(),
    }))
  );
});

export default router;
