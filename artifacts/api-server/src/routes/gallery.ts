import { Router, type IRouter } from "express";
import { db, galleryTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListGalleryQueryParams,
  CreateGalleryImageBody,
  DeleteGalleryImageParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/gallery", async (req, res) => {
  const query = ListGalleryQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "Invalid query" });
    return;
  }
  const { category } = query.data;
  let rows = await db.select().from(galleryTable).orderBy(galleryTable.sortOrder);
  if (category) rows = rows.filter((r) => r.category === category);
  res.json(rows.map(serializeGallery));
});

router.post("/gallery", async (req, res) => {
  const body = CreateGalleryImageBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const [row] = await db.insert(galleryTable).values(body.data).returning();
  res.status(201).json(serializeGallery(row));
});

router.delete("/gallery/:id", async (req, res) => {
  const params = DeleteGalleryImageParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }
  await db.delete(galleryTable).where(eq(galleryTable.id, params.data.id));
  res.json({ success: true, message: "Image deleted" });
});

function serializeGallery(g: typeof galleryTable.$inferSelect) {
  return {
    id: g.id,
    imageUrl: g.imageUrl,
    category: g.category,
    title: g.title,
    description: g.description,
    sortOrder: g.sortOrder,
    createdAt: g.createdAt.toISOString(),
  };
}

export default router;
