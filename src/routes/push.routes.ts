import { Router } from "express";
import { subscribeToPush } from "../controllers/push.controller";
import { authenticate } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/subscribe", authenticate, subscribeToPush);

export default router;
