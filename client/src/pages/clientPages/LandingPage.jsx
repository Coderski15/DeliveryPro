import { FaShippingFast, FaMapMarkerAlt, FaMoneyCheckAlt, FaHeadset, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import BookNow from './Booknow';

export default function LandingPage() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-16">
                <div className="container mx-auto px-6 md:flex items-center">
                    <motion.div
                        className="flex-1 text-center md:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <motion.span
                                className="inline-block"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >Fast & Reliable Courier Services</motion.span>
                        </h1>
                        <p className="mb-6 text-lg">Delivering with speed, safety, and efficiency.</p>
                        <button onClick={() => {
                            const token = localStorage.getItem("authToken");
                            window.location.href = token ? "/dashboard" : "/login";
                        }} className="bg-white text-blue-600 font-bold py-3 px-6 rounded-md shadow-md hover:bg-gray-100 flex items-center gap-2 transition">
                            Book Now <FaArrowRight />
                        </button>
                        {/* <button
                            onClick={() => {
                                const token = localStorage.getItem("authToken");
                                const userRole = localStorage.getItem("userRole");

                                if (!token) {
                                    window.location.href = "/login";
                                } else {
                                    switch (userRole) {
                                        case "admin":
                                            window.location.href = "/client/src/pages/adminPages/AdminDashboard";
                                            break;
                                        case "user":
                                            window.location.href = "/client/src/pages/customer/CustomerDashboard";
                                            break;
                                        case "delivery":
                                            window.location.href = "/client/src/pages/delivery/DeliveryDashboard";
                                            break;
                                        default:
                                            window.location.href = "/client/src/pages/clientPages/LandingPage";
                                    }
                                }
                            }}
                            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-md shadow-md hover:bg-gray-100 flex items-center gap-2 transition"
                        ><BookNow /> <FaArrowRight />
                        </button> */}
                    </motion.div>
                    <motion.div
                        className="flex-1 mt-10 md:mt-0 flex justify-end"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <img src="/assets/images/courierhome.png" alt="Courier Hero" className="p-8 object-contain h-auto" />
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 text-center">
                <h2 className="text-3xl font-bold">Why Choose Us?</h2>
                <div className="flex flex-wrap justify-center mt-8 gap-8">
                    <FeatureCard icon={<FaShippingFast />} title="Fast Delivery" description="Get your packages delivered quickly and efficiently." />
                    <FeatureCard icon={<FaMapMarkerAlt />} title="Real-Time Tracking" description="Track your courier in real-time with accurate updates." />
                    <FeatureCard icon={<FaMoneyCheckAlt />} title="Affordable Rates" description="Competitive pricing with no hidden costs." />
                    <FeatureCard icon={<FaHeadset />} title="24/7 Support" description="We’re here to help you anytime, anywhere." />
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-10 text-center justify-items-center">
                <h2 className="text-3xl font-bold">Ready to Ship?</h2>
                <p className="mt-2 text-lg">Sign up today and experience hassle-free delivery.</p>
                <button onClick={() => {
                    const token = localStorage.getItem("authToken");
                    window.location.href = token ? "/dashboard" : "/login";
                }} className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
                    Get Started <FaArrowRight />
                </button>
            </section>

            {/* Service Highlights */}
            <section className="py-16 flex flex-wrap justify-center gap-8">
                <ServiceImage src="/assets/images/whoweare.jpeg" alt="Courier Team" />
                <ServiceImage src="/assets/images/Dilevercarefullly.jpeg" alt="Delivery Process" />
                <ServiceImage src="/assets/images/Landpageimg3.jpeg" alt="Global Network" />
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-64 text-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="text-4xl text-blue-500">{icon}</div>
            <h3 className="mt-4 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
        </motion.div>
    );
}

function ServiceImage({ src, alt }) {
    return (
        <motion.img
            src={src}
            alt={alt}
            className="w-full max-w-md rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        />
    );
}
