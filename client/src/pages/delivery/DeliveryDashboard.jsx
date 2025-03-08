import { useState } from "react";
import { FaBox, FaMapMarkerAlt, FaBell, FaCalculator, FaCreditCard, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import Booking from "../customer/OnlineBooking";
import Tracking from "./Tracking";
import Notifications from "../customer/Notifications";
import Payment from "../customer/Payment";
import OnlineBooking from "./OnlineBooking";

const DeliveryDashboard = () => {
    const [activeTab, setActiveTab] = useState("booking");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { key: "booking", label: "Online Booking", icon: <FaBox /> },
        { key: "payment", label: "Payment", icon: <FaCreditCard /> },
        { key: "tracking", label: "Tracking", icon: <FaMapMarkerAlt /> },
        { key: "notifications", label: "Notifications", icon: <FaBell /> },
    ];

    return (
        <div className="flex h-screen mt-24">
            {/* Sidebar */}
            <div className={`bg-gray-900 text-white w-64 p-6 space-y-4 transition-all ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Courier Service</h2>
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
                {/* Toggle Button for Mobile View */}
                <button className="md:hidden p-2 bg-gray-200 rounded-full" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <FaBars size={24} />
                </button>
                <div className="mt-4">
                    {activeTab === "booking" && <OnlineBooking />}
                    {activeTab === "payment" && <Payment />}
                    {activeTab === "tracking" && <Tracking />}
                    {activeTab === "notifications" && <Notifications />}

                </div>
            </div>
        </div>
    );
};

export default DeliveryDashboard;