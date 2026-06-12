import { Router, type IRouter } from "express";
import { db, settingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateSettingsBody } from "@workspace/api-zod";

const router: IRouter = Router();

async function ensureSettings() {
  const [existing] = await db.select().from(settingsTable).limit(1);
  if (!existing) {
    const [created] = await db.insert(settingsTable).values({}).returning();
    return created;
  }
  return existing;
}

router.get("/settings", async (_req, res) => {
  const settings = await ensureSettings();
  res.json(serializeSettings(settings));
});

router.patch("/settings", async (req, res) => {
  const body = UpdateSettingsBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const existing = await ensureSettings();
  const [updated] = await db
    .update(settingsTable)
    .set(body.data)
    .where(eq(settingsTable.id, existing.id))
    .returning();
  res.json(serializeSettings(updated));
});

function serializeSettings(s: typeof settingsTable.$inferSelect) {
  return {
    id: s.id,
    instituteName: s.instituteName,
    tagline: s.tagline,
    logoUrl: s.logoUrl,
    phone: s.phone,
    email: s.email,
    address: s.address,
    whatsapp: s.whatsapp,
    facebook: s.facebook,
    instagram: s.instagram,
    linkedin: s.linkedin,
    youtube: s.youtube,
    heroTitle: s.heroTitle,
    heroSubtitle: s.heroSubtitle,
    heroBannerUrl: s.heroBannerUrl,
  };
}

export default router;
