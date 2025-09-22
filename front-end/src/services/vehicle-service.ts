import type { Vehicle } from "../models/entities";
import { ApiClient } from "./api-client";

export interface DescriptionResponse {
    aiDescription: string;
}

export class VehicleService extends ApiClient {
    constructor() {
        super(import.meta.env.VITE_API_URL || "http://localhost:5000/api");
    }

    async getAll(): Promise<Vehicle[]> {
        const res = await this.api.get("/vehicles");
        return res.data as Vehicle[];
    }

    async getById(id: number): Promise<Vehicle> {
        const res = await this.api.get(`/vehicles/${id}`);
        return res.data;
    }

    async create(vehicle: Vehicle, contentType?: string): Promise<Vehicle> {
        const headers = contentType ? { "Content-Type": contentType } : undefined;
        const res = await this.api.post("/vehicles/create", vehicle, { headers });
        return res.data;
    }

    async update(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
        const res = await this.api.put(`/vehicles/${id}`, vehicle);
        return res.data;
    }

    async remove(id: number): Promise<void> {
        await this.api.delete(`/vehicles/${id}`);
    }

    async generateDescription(data: any): Promise<DescriptionResponse> {
        const res = await this.api.post("/vehicles/generate-description", data);
        return res.data;
    }
}
