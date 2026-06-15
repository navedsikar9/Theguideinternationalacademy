import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  try {
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

export default router;