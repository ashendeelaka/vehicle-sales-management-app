import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Vehicle } from "../models/entities";
import { VehicleService } from "../services/vehicle-service";
import Navbar from "../components/Navbar";

export default function VehicleDetails() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        const fetchVehicleById = async () => {
            const vehicleRestService = new VehicleService();
            const response = await vehicleRestService.getById(Number(id));
            setVehicle(response);
        };
        fetchVehicleById();
    }, [id]);

    if (!vehicle) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

    return (
        <div className="container mx-auto p-6">
            <Navbar/>
            <h1 className="text-xl md:text-4xl font-bold mb-8 text-gray-800 text-center md:text-left">
                {vehicle.brand} {vehicle.modelName}
            </h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Images Section */}
                {/* Images Section */}
                <div className="flex-1 grid grid-cols-1 gap-4">
                    {vehicle.images && vehicle.images.length > 0 ? (
                        vehicle.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={`${import.meta.env.VITE_BASE_URL}/${img}`}
                                alt={`Vehicle ${idx}`}
                                className="w-full h-40 md:h-56 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                            />
                        ))
                    ) : (
                        <div className="w-full h-40 md:h-56 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
                            No Images
                        </div>
                    )}
                </div>


                {/* Details Section */}
                <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                    <p className="mb-3 text-gray-700">
                        <span className="font-semibold">Type:</span> {vehicle.vehicleType}
                    </p>
                    {vehicle.color && (
                        <p className="mb-3 text-gray-700">
                            <span className="font-semibold">Color:</span> {vehicle.color}
                        </p>
                    )}
                    {vehicle.engineSize && (
                        <p className="mb-3 text-gray-700">
                            <span className="font-semibold">Engine:</span> {vehicle.engineSize}
                        </p>
                    )}
                    {vehicle.year && (
                        <p className="mb-3 text-gray-700">
                            <span className="font-semibold">Year:</span> {vehicle.year}
                        </p>
                    )}
                    <p className="mb-3 text-blue-600 font-semibold text-lg">
                        Price: ${vehicle.price.toLocaleString()}
                    </p>

                    {vehicle.aiDescription && (
                        <p className="mt-4 text-gray-600 leading-relaxed">{vehicle.aiDescription}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
