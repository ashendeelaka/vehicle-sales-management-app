import { useEffect, useState } from "react";
import { VehicleService } from "../services/vehicle-service";
import type { Vehicle } from "../models/entities";

export default function VehicleForm() {
  const [vehicleType, setVehicleType] = useState("");
  const [brand, setBrand] = useState("");
  const [modelName, setModelName] = useState("");
  const [color, setColor] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [aiDescription, setAiDescription] = useState("");

  useEffect(()=>{
    console.log("aides: ",aiDescription)
  },[aiDescription])

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const vehicleRestService = new VehicleService();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);

      const previews = files.map((file) => URL.createObjectURL(file));
      setPreview(previews);
    }
  };

  // call backend API to generate AI description
  const handleGenerateDescription = async () => {
    setLoading(true);
    try {
      const vehicleData = {
        vehicleType, brand, modelName, color, engineSize, year, price
      }

      const res = await vehicleRestService.generateDescription(vehicleData);
      setAiDescription(res.aiDescription);
      setMessage("✅ Description generated! You can edit it before saving.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to generate description");
    } finally {
      setLoading(false);
    }
  };

  // save vehicle to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      if (price === "") {
        setMessage("❌ Price is required.");
        return;
      }

      const formData = new FormData();
      formData.append("vehicleType", vehicleType);
      formData.append("brand", brand);
      formData.append("modelName", modelName);
      formData.append("color", color);
      formData.append("engineSize", engineSize);
      formData.append("year", year.toString());
      formData.append("price", price.toString());
      formData.append("aiDescription", aiDescription);

      console.log("data: ",aiDescription)

      images.forEach((file) => formData.append("images", file));
      const response = await vehicleRestService.create(formData as unknown as Vehicle, 'multipart/form-data');

      setMessage("✅ Vehicle added successfully!");
      console.log("Response:", response);

      // reset form
      setVehicleType("");
      setBrand("");
      setModelName("");
      setColor("");
      setEngineSize("");
      setYear("");
      setPrice("");
      setImages([]);
      setAiDescription("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save vehicle");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Vehicle</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Engine Size"
          value={engineSize}
          onChange={(e) => setEngineSize(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
        />
        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
          required
        />
        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="input" />

        <div className="flex gap-2">
          {preview.map((src, idx) => (
            <img key={idx} src={src} alt={`preview ${idx}`} className="w-20 h-20 object-cover rounded border" />
          ))}
        </div>

        {/* AI Description Section */}
        <div>
          <label className="block font-semibold mb-2">AI-Generated Description</label>
          <textarea
            className="w-full p-2 border rounded h-28"
            placeholder="Click 'Generate Description' to auto-fill"
            value={aiDescription}
            onChange={(e) => setAiDescription(e.target.value)} // editable
          />
          <button
            type="button"
            onClick={handleGenerateDescription}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate / Regenerate Description"}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Vehicle
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}