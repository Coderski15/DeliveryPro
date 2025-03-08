import { useState, useEffect } from "react";
import { FaUsers, FaBox, FaCreditCard, FaBars, FaTimes } from "react-icons/fa";
import Users from "./Users";
import Couriers from "./Couriers";
import Payments from "./Payments";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { key: "users", label: "Manage Users", icon: <FaUsers /> },
        { key: "couriers", label: "Manage Couriers", icon: <FaBox /> },
        { key: "payments", label: "Manage Payments", icon: <FaCreditCard /> },
    ];

    return (
        <div className="flex h-screen mt-24">
            {/* Sidebar */}
            <div className={`bg-gray-900 text-white w-64 p-6 space-y-4 transition-all ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                    <button className="text-white md:hidden" onClick={() => setIsSidebarOpen(false)}>
                        <FaTimes size={24} />
                    </button>
                </div>
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setActiveTab(item.key)}
                            className={`flex items-center space-x-2 p-2 rounded w-full transition ${activeTab === item.key ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`}
                        >
                            {item.icon} <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
                <button className="md:hidden p-2 bg-gray-200 rounded-full" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <FaBars size={24} />
                </button>
                <div className="mt-4">
                    {activeTab === "users" && <Users />}
                    {activeTab === "couriers" && <Couriers />}
                    {activeTab === "payments" && <Payments />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
