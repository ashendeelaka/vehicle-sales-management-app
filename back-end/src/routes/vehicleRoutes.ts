import { Router } from "express";
import { createVehicle, deleteVehicle, generateDescription, getVehicleById, getVehicles, updateVehicle } from "../controllers/vehicleController";
import { authenticate } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

router.post("/create", upload.array("images", 5), authenticate, createVehicle);
router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.put("/:id", authenticate, updateVehicle);
router.delete("/:id", authenticate, deleteVehicle);
router.post("/generate-description", authenticate, generateDescription);

export default router;
