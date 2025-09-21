import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

import authRoutes from "./routes/authRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

AppDataSource.initialize().then(() => {
    console.log("📦 DB connected successfully");
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
}).catch((err) => console.error("DB init error:", err));