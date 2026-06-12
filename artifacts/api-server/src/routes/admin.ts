import { Router, type IRouter } from "express";
import { db, adminsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { AdminLoginBody } from "@workspace/api-zod";
import type { Request, Response } from "express";

const router: IRouter = Router();

declare module "express-session" {
  interface SessionData {
    adminId: number;
    adminUsername: string;
  }
}

router.post("/admin/login", async (req: Request, res: Response) => {
  const body = AdminLoginBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ success: false, message: "Invalid request" });
    return;
  }

  const { username, password } = body.data;
  const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.username, username));

  if (!admin) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }

  if (req.session) {
    req.session.adminId = admin.id;
    req.session.adminUsername = admin.username;
  }

  res.json({ success: true, message: "Login successful" });
});

router.post("/admin/logout", (req: Request, res: Response) => {
  req.session?.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
});

router.get("/admin/me", (req: Request, res: Response) => {
  if (req.session?.adminId) {
    res.json({ authenticated: true, username: req.session.adminUsername });
  } else {
    res.json({ authenticated: false, username: null });
  }
});

export default router;
