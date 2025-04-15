import { useEffect, useState } from "react";
import client from "../../lib/axios";
import { FaMapMarkerAlt, FaBoxOpen, FaUser, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const Couriers = () => {
    const [couriers, setCouriers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCouriers();
    }, []);

    const fetchCouriers = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await client.get("/admin/couriers", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCouriers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching couriers:", error);
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await client.put(`/admin/couriers/${id}/status`, {
                status: newStatus,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update local state
            setCouriers((prev) =>
                prev.map((courier) =>
                    courier._id === id ? { ...courier, status: newStatus } : courier
                )
            );
        } catch (error) {
            console.error("Error updating courier status:", error);
        }
    };

    const statuses = ["pending", "picked up", "in transit", "delivered"];

    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100">
            <motion.h2
                className="text-3xl font-bold text-blue-700 text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Manage Couriers
            </motion.h2>

            {loading ? (
                <p className="text-center text-gray-600">Loading couriers...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {couriers.map((courier) => (
                        <motion.div
                            key={courier._id}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-3 mb-3 text-lg text-gray-800">
                                <FaUser className="text-blue-500" />
                                {courier.customer?.name || "N/A"}
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                <FaMapMarkerAlt className="text-green-500" />
                                Pickup: {courier.pickupAddress}
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                <FaMapMarkerAlt className="text-red-500" />
                                Delivery: {courier.deliveryAddress}
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-700 mb-3">
                                <FaBoxOpen className="text-yellow-500" />
                                Delivery Type: {courier.deliveryType}
                            </div>

                            <div className="text-sm font-semibold text-gray-800 mb-4">
                                Status: <span className="capitalize text-blue-600">{courier.status}</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => updateStatus(courier._id, status)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium border transition
                                            ${courier.status === status
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 hover:bg-blue-100"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Couriers;
