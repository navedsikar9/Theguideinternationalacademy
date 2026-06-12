import { Router, type IRouter } from "express";
import healthRouter from "./health";
import coursesRouter from "./courses";
import studentsRouter from "./students";
import certificatesRouter from "./certificates";
import galleryRouter from "./gallery";
import testimonialsRouter from "./testimonials";
import contactRouter from "./contact";
import adminRouter from "./admin";
import dashboardRouter from "./dashboard";
import settingsRouter from "./settings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(coursesRouter);
router.use(studentsRouter);
router.use(certificatesRouter);
router.use(galleryRouter);
router.use(testimonialsRouter);
router.use(contactRouter);
router.use(adminRouter);
router.use(dashboardRouter);
router.use(settingsRouter);

export default router;
