import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const { token, setToken } = useAuthContext();
    const navigate = useNavigate();

    if (!token) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Access Required</h2>
                    <p className="text-gray-600">Please login with your admin account to continue.</p>
                    <button
                        onClick={() => navigate("/admin/login")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200 mt-4"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }


    const logout = () => {
        localStorage.removeItem("token");
        setToken!('')  // Remove JWT token from context
        navigate("/");          // Redirect to login page
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-indigo-600 mb-8">🚗 Vehicle Admin</h2>
                <nav className="flex flex-col gap-4 text-gray-700">
                    <a href="/" className="hover:text-indigo-500 font-medium">🏠 Explore</a>
                    <a href="#add" className="hover:text-indigo-500 font-medium">➕ Add Vehicle</a>
                    <a href="#manage" className="hover:text-indigo-500 font-medium">📋 Manage Vehicles</a>
                    <a href="#settings" className="hover:text-indigo-500 font-medium">⚙️ Settings</a>
                </nav>
                <div className="mt-auto">
                    <button
                        onClick={logout}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-sm transition"
                    >
                        Logout
                    </button>

                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        Logged in as Admin
                    </span>
                </div>

                {/* Add Vehicle */}
                <section id="add" className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">➕ Add New Vehicle</h2>
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <VehicleForm />
                    </div>
                </section>

                {/* Manage Vehicles */}
                <section id="manage">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">📋 Manage Vehicles</h2>
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <VehicleList />
                    </div>
                </section>
            </main>
        </div>
    );
}