import { useEffect, useState } from "react";
import type { Vehicle } from "../models/entities";
import { VehicleService } from "../services/vehicle-service";
import { FaEdit, FaSyncAlt, FaTrash } from "react-icons/fa";

export default function VehicleList() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [editing, setEditing] = useState<Vehicle | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const vehicleRestService = new VehicleService();

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        const data = await vehicleRestService.getAll();
        setVehicles(data);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this vehicle?")) {
            await vehicleRestService.remove(id);
            fetchVehicles();
        }
    };

    const handleSave = async () => {
        if (editing) {
            await vehicleRestService.update(editing.id!, editing);
            setEditing(null);
            fetchVehicles();
        }
    };

    const handleRegenerate = async (id: number) => {
        try {
            setIsGenerating(true);
            const vehicle = vehicles.find(v => v.id === id);
            const updated = await vehicleRestService.generateDescription({
                vehicleType: vehicle?.vehicleType,
                brand: vehicle?.brand,
                modelName: vehicle?.modelName,
                color: vehicle?.color,
                engineSize: vehicle?.engineSize,
                year: vehicle?.year,
                price: vehicle?.price
            });
            setVehicles(prev =>
                prev.map(v =>
                    v.id === id ? { ...v, aiDescription: updated.aiDescription } : v
                )
            );
            await vehicleRestService.update(id, {
                vehicleType: vehicle?.vehicleType,
                brand: vehicle?.brand,
                modelName: vehicle?.modelName,
                color: vehicle?.color,
                engineSize: vehicle?.engineSize,
                year: vehicle?.year,
                price: vehicle?.price,
                aiDescription: updated.aiDescription
            });
            fetchVehicles();
            setIsGenerating(false);
        }
        catch (err) {
            console.error(err);
            setIsGenerating(false);
        }

    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((v) => (
                    <div key={v.id} className="bg-white shadow-md rounded-xl overflow-hidden">
                        {/* Vehicle Image */}
                        {v.images?.length! > 0 ? (
                            <img
                                src={`${import.meta.env.VITE_BASE_URL}/${v.images![0]}`}
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
                            <p className="text-gray-800 font-semibold mb-2">
                                Price: ${v.price.toLocaleString()}
                            </p>

                            {v.aiDescription && (
                                <p className="text-gray-700 text-sm mb-2 line-clamp-3">
                                    {v.aiDescription}
                                </p>
                            )}

                            <div className="flex gap-2 mt-2">
                                <button
                                    className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                    onClick={() => setEditing(v)}
                                >
                                    <FaEdit className="w-3 h-3" /> Edit
                                </button>
                                <button
                                    className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                                    onClick={() => handleRegenerate(v.id!)}
                                >
                                    <FaSyncAlt className="w-3 h-3 animate-spin-slow" /> {isGenerating ? "Generating..." : "Generate"}
                                </button>
                                <button
                                    className="flex-1 flex items-center justify-center gap-1 bg-white px-2 rounded cursor-pointer"
                                    onClick={() => handleDelete(v.id!)}
                                >
                                    <FaTrash className="w-3 h-3" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editing && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Vehicle</h2>

                        <input
                            type="text"
                            value={editing.brand}
                            onChange={(e) =>
                                setEditing({ ...editing, brand: e.target.value })
                            }
                            className="w-full border p-2 mb-2"
                        />
                        <input
                            type="text"
                            value={editing.modelName}
                            onChange={(e) =>
                                setEditing({ ...editing, modelName: e.target.value })
                            }
                            className="w-full border p-2 mb-2"
                        />
                        <input
                            type="number"
                            value={editing.price}
                            onChange={(e) =>
                                setEditing({ ...editing, price: Number(e.target.value) })
                            }
                            className="w-full border p-2 mb-2"
                        />

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditing(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}