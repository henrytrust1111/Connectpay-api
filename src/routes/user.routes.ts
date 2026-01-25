import { Router } from "express";
import { fetchAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", fetchAllUsers);

export default router;
