import { Router } from "express";
import { start, end } from "../controllers/call.controller";

const router = Router();

router.post("/start", start);
router.post("/end", end);

export default router;