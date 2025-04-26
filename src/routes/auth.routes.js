import { Router } from "express";
import { register } from "../controllers/auth.controllers.js"
import { registerUserValidater } from "../utils/validator.js"
import { isValidPayload } from "../middleware/validate.middleware.js"
const router = Router();

router.post('/register', registerUserValidater(), isValidPayload, register)
export default router;