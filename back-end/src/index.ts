import dotenv from "dotenv";
dotenv.config();

import express, { Application} from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./routes/authRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import path from "path";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/uploads", express.static(path.join(__dirname, "..", process.env.UPLOAD_DIR || "uploads")));

AppDataSource.initialize().then(() => {
    console.log("📦 DB connected successfully");
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
}).catch((err) => console.error("DB init error:", err));