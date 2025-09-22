export interface Vehicle {
  id?: number;
  vehicleType: string;
  brand: string;
  modelName: string;
  color?: string;
  engineSize?: string;
  year?: number;
  price: number;
  images?: any[];
  aiDescription?: string;
}

