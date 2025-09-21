import { Router } from "express";
import { createVehicle, getVehicles } from "../controllers/vehicleController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/create",  createVehicle);
router.get("/", getVehicles);

export default router;
