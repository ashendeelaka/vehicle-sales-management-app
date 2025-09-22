import { Router } from "express";
import { createAdmin, login } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/register", createAdmin); 

export default router;