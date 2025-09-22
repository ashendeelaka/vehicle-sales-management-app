import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Vehicle } from "../models/entities";
import { VehicleService } from "../services/vehicle-service";
import Navbar from "../components/Navbar";

export default function Home() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const navigate = useNavigate();

    const vehicleRestService = new VehicleService()
    useEffect(() => {
        const fetchVehicles = async () => {
            const data = await vehicleRestService.getAll();
            setVehicles(data);
        }
        fetchVehicles();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <Navbar/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map(v => (
                    <div
                        key={v.id}
                        onClick={() => navigate(`/vehicle/${v.id}`)}
                        className="cursor-pointer bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                    >
                        {v.images && v.images.length > 0 ? (
                            <img
                                src={`${import.meta.env.VITE_BASE_URL}/${v.images[0]}`}
                                alt={`${v.brand} ${v.modelName}`}
                                className="w-full h-48 object-cover"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}

                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-1">
                                {v.brand} {v.modelName}
                            </h3>
                            <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Type:</span> {v.vehicleType}
                            </p>
                            {v.price && (
                                <p className="text-gray-800 font-semibold mb-2">
                                    Price: ${v.price.toLocaleString()}
                                </p>
                            )}
                            {v.aiDescription && (
                                <p className="text-gray-700 text-sm line-clamp-3">
                                    {v.aiDescription}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}