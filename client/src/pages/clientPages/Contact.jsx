import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-6 mt-16">
            {/* Header Section */}
            <motion.h1
                className="text-4xl font-bold text-center text-blue-600 mb-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Get in Touch
            </motion.h1>
            <motion.p
                className="text-lg text-gray-700 text-center max-w-2xl mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Have questions? Reach out to us, and our team will be happy to help.
            </motion.p>

            {/* Contact Section */}
            <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl">
                {/* Contact Info Cards - Left Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                    <ContactCard icon={<FaPhone />} title="Phone" detail="+91 8169282753" />
                    <ContactCard icon={<FaEnvelope />} title="Email" detail="support@deliverypro.com" />
                    <ContactCard icon={<FaMapMarkerAlt />} title="Address" detail="Garden, Borivali, India" />
                    <ContactCard icon={<FaClock />} title="Working Hours" detail="Mon - Fri: 9 AM - 6 PM" />
                </div>

                {/* Contact Form - Right Side */}
                <motion.div
                    className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Send Us a Message</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        <motion.button
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

function ContactCard({ icon, title, detail }) {
    return (
        <motion.div
            className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div className="text-blue-600 text-4xl mb-3">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-2">{detail}</p>
        </motion.div>
    );
}
