import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import client from "../../lib/axios";
import { FaTruck, FaCheckCircle, FaMapMarkerAlt, FaBox, FaClipboardCheck } from "react-icons/fa";

const OnlineBooking = () => {
    const [availableDeliveries, setAvailableDeliveries] = useState([]);
    const [bookedDeliveries, setBookedDeliveries] = useState([]);

    useEffect(() => {
        fetchAvailableDeliveries();
        fetchBookedDeliveries();
    }, []);

    const fetchAvailableDeliveries = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await client.get("/courier/available", {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Filter out deliveries that already have a deliveryPerson assigned
            const filteredDeliveries = response.data.filter(delivery => !delivery.deliveryPerson);
            setAvailableDeliveries(filteredDeliveries);
        } catch (error) {
            console.error("Error fetching deliveries", error);
        }
    };

    const fetchBookedDeliveries = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await client.get("/courier/delivery", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookedDeliveries(response.data);
        } catch (error) {
            console.error("Error fetching booked deliveries", error);
        }
    };

    const acceptDelivery = async (courierId) => {
        try {
            const token = localStorage.getItem("authToken");
            await client.put("/courier/assign", { courierId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAvailableDeliveries();
            fetchBookedDeliveries();
        } catch (error) {
            console.error("Error accepting delivery", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaTruck className="mr-2 text-blue-600" /> Available Deliveries
            </h2>

            <div className="space-y-4">
                {availableDeliveries.length > 0 ? (
                    availableDeliveries.map((delivery) => (
                        <div key={delivery._id} className="p-4 border rounded shadow-md">
                            <h3 className="text-lg font-semibold flex items-center">
                                <FaBox className="mr-2 text-gray-700" /> Package Details
                            </h3>
                            <p className="text-gray-600 flex items-center">
                                <FaMapMarkerAlt className="mr-2" /> Pickup: {delivery.pickupAddress}
                            </p>
                            <p className="text-gray-600 flex items-center">
                                <FaMapMarkerAlt className="mr-2" /> Drop-off: {delivery.deliveryAddress}
                            </p>
                            <p className="text-gray-600">Weight: {delivery.packageDetails.weight} kg</p>
                            <p className="text-gray-600">Size: {delivery.packageDetails.size}</p>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => acceptDelivery(delivery._id)}
                                className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700 transition"
                            >
                                Accept Delivery
                            </motion.button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No available deliveries</p>
                )}
            </div>

            {/* Booked Deliveries Section */}
            {bookedDeliveries.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-green-600">
                        <FaClipboardCheck className="mr-2" /> Your Booked Deliveries
                    </h2>

                    <div className="space-y-4">
                        {bookedDeliveries.map((delivery) => (
                            <div key={delivery._id} className="p-4 border rounded shadow-md bg-green-100">
                                <h3 className="text-lg font-semibold flex items-center">
                                    <FaBox className="mr-2 text-gray-700" /> Package Details
                                </h3>
                                <p className="text-gray-600 flex items-center">
                                    <FaMapMarkerAlt className="mr-2" /> Pickup: {delivery.pickupAddress}
                                </p>
                                <p className="text-gray-600 flex items-center">
                                    <FaMapMarkerAlt className="mr-2" /> Drop-off: {delivery.deliveryAddress}
                                </p>
                                <p className="text-gray-600">Weight: {delivery.packageDetails.weight} kg</p>
                                <p className="text-gray-600">Size: {delivery.packageDetails.size}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OnlineBooking;