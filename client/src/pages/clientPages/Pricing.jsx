import { useState } from "react";
import { motion } from "framer-motion";
import { FaWeightHanging, FaBox, FaMapMarkerAlt, FaTruck, FaDollarSign } from "react-icons/fa";

export default function Pricing() {
    const [weight, setWeight] = useState(1);
    const [size, setSize] = useState("small");
    const [destination, setDestination] = useState("");
    const [cost, setCost] = useState(null);

    const deliveryOptions = [
        { type: "Standard", pricePerKg: 5, icon: <FaTruck className="text-blue-500" size={24} /> },
        { type: "Express", pricePerKg: 10, icon: <FaTruck className="text-red-500" size={24} /> },
    ];

    const calculateCost = () => {
        if (!destination) return;
        const basePrice = size === "small" ? 2 : size === "medium" ? 5 : 10;
        const prices = deliveryOptions.map(option => ({
            type: option.type,
            price: basePrice + weight * option.pricePerKg,
        }));
        setCost(prices);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 text-center mt-20">
            <motion.h1 className="text-4xl font-bold mb-6" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
                Pricing & Cost Estimation
            </motion.h1>
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center border rounded-md p-2">
                        <FaWeightHanging className="text-gray-500 mr-2" />
                        <input
                            type="number"
                            min="1"
                            className="w-full p-2 border rounded-md"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            placeholder="Weight (kg)"
                        />
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                        <FaBox className="text-gray-500 mr-2" />
                        <select className="w-full p-2 border rounded-md" value={size} onChange={(e) => setSize(e.target.value)}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Destination"
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={calculateCost}
                    >
                        Calculate Cost
                    </button>
                </div>
            </div>

            {cost && (
                <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-bold mb-4">Delivery Options</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {cost.map((option, index) => (
                            <motion.div key={index} className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center"
                                whileHover={{ scale: 1.05 }}>
                                {deliveryOptions[index].icon}
                                <h3 className="text-xl font-semibold mt-2">{option.type} Delivery</h3>
                                <p className="text-lg font-bold text-green-600 flex items-center gap-2">
                                    <FaDollarSign /> {option.price.toFixed(2)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
