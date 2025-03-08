import React from "react";
import { FaShippingFast, FaBoxOpen, FaMapMarkedAlt, FaMoneyCheckAlt, FaHeadset, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
    {
        title: "Fast Delivery",
        description: "Get your packages delivered within the shortest time possible with our express delivery service.",
        icon: <FaShippingFast className="text-4xl text-blue-500" />,
    },
    {
        title: "Secure Packaging",
        description: "We ensure safe and secure packaging to prevent any damage during transit.",
        icon: <FaBoxOpen className="text-4xl text-green-500" />,
    },
    {
        title: "Real-Time Tracking",
        description: "Track your shipments in real-time with our advanced tracking system.",
        icon: <FaMapMarkedAlt className="text-4xl text-orange-500" />,
    },
    {
        title: "Affordable Pricing",
        description: "Get the best rates for shipping your packages without compromising on service.",
        icon: <FaMoneyCheckAlt className="text-4xl text-yellow-500" />,
    },
    {
        title: "24/7 Customer Support",
        description: "Our support team is available round the clock to assist you with any queries.",
        icon: <FaHeadset className="text-4xl text-purple-500" />,
    },
    {
        title: "Timely Delivery",
        description: "We guarantee on-time delivery so your packages arrive as scheduled.",
        icon: <FaClock className="text-4xl text-red-500" />,
    },
];

const Services = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 m-16">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    We offer a wide range of courier and logistics services to cater to your needs.
                </p>
            </motion.div>

            {/* Services Grid */}
            <div className="mt-10 grid gap-8 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                    >
                        {service.icon}
                        <h2 className="text-xl font-semibold text-gray-800 mt-4">{service.title}</h2>
                        <p className="text-gray-600 mt-2">{service.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;
