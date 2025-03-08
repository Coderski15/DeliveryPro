import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBox, FaTruck, FaDollarSign, FaClock, FaCheckCircle, FaWeightHanging } from "react-icons/fa";
import client from "../../lib/axios"

const OnlineBooking = () => {
    const [pickupAddress, setPickupAddress] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [weight, setWeight] = useState(1);
    const [size, setSize] = useState("small");
    const [deliveryType, setDeliveryType] = useState("Standard");
    const [cost, setCost] = useState(null);
    const [isBooked, setIsBooked] = useState(false);

    const deliveryOptions = {
        Standard: { pricePerKg: 5 },
        Express: { pricePerKg: 10 },
    };

    useEffect(() => {
        calculateCost();
    }, [weight, size, deliveryType, deliveryAddress]);

    const calculateCost = () => {
        if (!deliveryAddress) return;
        const basePrice = size === "small" ? 2 : size === "medium" ? 5 : 10;
        const price = basePrice + weight * deliveryOptions[deliveryType].pricePerKg;
        setCost(price);
    };

    const handleBooking = async () => {
        const bookingData = { pickupAddress, deliveryAddress, weight, size, deliveryType, cost };
        console.log("Booking Data Sent: ", bookingData);
        const token = localStorage.getItem("authToken");

        try {
            await client.post("/courier/", bookingData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsBooked(true);
            setTimeout(() => setIsBooked(false), 3000);
        } catch (error) {
            console.error("Booking failed", error);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaBox className="mr-2 text-blue-600" /> Book a Courier
            </h2>
            <div className="space-y-4">
                <div className="flex items-center border p-2 rounded">
                    <FaMapMarkerAlt className="text-gray-500 mr-2" />
                    <input type="text" placeholder="Pickup Address" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} className="w-full outline-none" />
                </div>
                <div className="flex items-center border p-2 rounded">
                    <FaMapMarkerAlt className="text-gray-500 mr-2" />
                    <input type="text" placeholder="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="w-full outline-none" />
                </div>
                <div className="flex items-center border p-2 rounded">
                    <FaWeightHanging className="text-gray-500 mr-2" />
                    <input type="number" min="1" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full outline-none" placeholder="Weight (kg)" />
                </div>
                <div className="flex items-center border p-2 rounded">
                    <FaBox className="text-gray-500 mr-2" />
                    <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full outline-none">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div className="flex items-center border p-2 rounded">
                    <FaTruck className="text-gray-500 mr-2" />
                    <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} className="w-full outline-none">
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                    </select>
                </div>
                {cost && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Estimated Cost</h2>
                        <div className="p-2 bg-gray-100 rounded mt-2 flex justify-between items-center">
                            <span>{deliveryType} Delivery</span>
                            <span className="text-green-600 font-bold flex items-center">
                                <FaDollarSign className="mr-1" /> {cost.toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}
                <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} onClick={handleBooking} className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center hover:bg-blue-700 transition">
                    <FaClock className="mr-2" /> Book Now
                </motion.button>
                {isBooked && (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-3 bg-green-100 text-green-700 flex items-center justify-center rounded">
                        <FaCheckCircle className="mr-2" /> Booking Confirmed!
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default OnlineBooking;
