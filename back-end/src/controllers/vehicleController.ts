import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Vehicle } from "../entities/Vehicle";
import { openai } from "../config/openai";
import { upload } from "../middleware/uploadMiddleware";


const vehicleRepository = AppDataSource.getRepository(Vehicle);

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleType, brand, modelName, color, engineSize, year, price, aiDescription } = req.body;

    const images = req.files as Express.Multer.File[];
    const imagePaths = images ? images.map((file) => file.path) : [];

    const imagePathsCorrected = imagePaths.map(path => path.replace(/\\/g, "/"));


    const vehicle = vehicleRepository.create({
      vehicleType,
      brand,
      modelName,
      color,
      engineSize,
      year: year ? Number(year) : undefined,
      price: Number(price),
      images: imagePathsCorrected,
      aiDescription
    });

    const saved = await vehicleRepository.save(vehicle);
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

export const generateDescription = async (req: Request, res: Response) => {
  try {
    const { vehicleType, brand, modelName, color, engineSize, year, price } = req.body;

    // Step 1: Generate AI description
    const prompt = `Write a catchy and creative sales description for a ${year || ""} ${brand} ${modelName}, 
    type: ${vehicleType}, color: ${color || "N/A"}, engine: ${engineSize || "N/A"}, price: $${price}.`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // you can also use gpt-4o or gpt-3.5-turbo
      messages: [
        { role: "system", content: "You are a car sales assistant that writes creative and persuasive vehicle ads. don't use emojies" },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const generatedDescription = aiResponse.choices[0].message?.content || "No description generated.";

    // Step 2: Return description to frontend for editing
    return res.status(200).json({
      success: true,
      aiDescription: generatedDescription,
      message: "AI description generated. You can edit or confirm before saving.",
    });
  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ success: false, message: "Failed to generate AI description" });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const vehicleRepo = AppDataSource.getRepository(Vehicle);
    const vehicle = await vehicleRepo.findOne({ where: { id: Number(id) } });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const vehicle = await vehicleRepository.findOne({
      where: { id: Number(id) },
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await vehicleRepository.remove(vehicle);

    return res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Failed to delete vehicle" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { vehicleType, brand, modelName, color, engineSize, year, price, aiDescription } =
      req.body;

    const vehicle = await vehicleRepository.findOne({
      where: { id: Number(id) },
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Handle uploaded images if any
    const files = req.files as Express.Multer.File[];
    let updatedImages = vehicle.images || [];

    if (files && files.length > 0) {
      const uploadedPaths = files.map((file) => file.path.replace(/\\/g, "/"));
      updatedImages = [...updatedImages, ...uploadedPaths]; // append new images
    }

    vehicleRepository.merge(vehicle, {
      vehicleType,
      brand,
      modelName,
      color,
      engineSize,
      year: year ? Number(year) : undefined,
      price: price ? Number(price) : vehicle.price,
      aiDescription,
      images: updatedImages,
    });

    const updated = await vehicleRepository.save(vehicle);
    return res.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Failed to update vehicle" });
  }
};
