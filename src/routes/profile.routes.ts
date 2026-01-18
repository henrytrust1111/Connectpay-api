import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller";
import { validate } from "../middlewares/validation.middleware";
import { updateProfileSchema } from "../validators/profile.validation";

const router = Router();

router.get("/", getProfile);
router.put("/", validate(updateProfileSchema), updateProfile);

export default router;