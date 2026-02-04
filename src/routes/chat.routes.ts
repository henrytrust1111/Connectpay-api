import { Router } from "express";
import { getHistory, editMessage, deleteMessage } from "../controllers/chat.controller";

const router = Router();

router.get("/:userId", getHistory);
router.patch("/message/:id", editMessage);
router.delete("/message/:id", deleteMessage);

export default router;