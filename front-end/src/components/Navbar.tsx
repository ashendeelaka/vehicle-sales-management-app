import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();


  return (
    <nav className="bg-white shadow-md mb-16">
      <div className="container mx-auto px-6 py-8 flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate("/")}>
          VehicleSales
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-500 transition">
            Admin
          </Link>
          
        </div>
      </div>
    </nav>
  );
}