import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Vehicle } from "../entities/Vehicle";

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(Vehicle);
    const vehicle = repo.create(req.body);
    const saved = await repo.save(vehicle);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const getVehicles = async (_req: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(Vehicle);
    const vehicles = await repo.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Internal Server error" });
  }
};
