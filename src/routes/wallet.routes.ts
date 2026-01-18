import { Router } from "express";
import { create, getBalance } from "../controllers/wallet.controller";

const router = Router();

router.post("/create", create);
router.get("/balance", getBalance);

export default router;