import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import Homepage from "../pages/Homepage";
import VehicleDetails from "../pages/VehicleDetails";
import AdminLogin from "../pages/AdminLogin";
// import VehiclePage from "../pages/VehiclePage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
