import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { FaUserAlt, FaRupeeSign, FaClipboardCheck, FaMoneyCheckAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get("/admin/payments", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching payments:", error);
            setLoading(false);
        }
    };

    const updatePaymentStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("authToken");
            await axios.put(`/admin/payments/${id}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update local state
            setPayments((prev) =>
                prev.map((payment) =>
                    payment._id === id ? { ...payment, status: newStatus } : payment
                )
            );
        } catch (error) {
            console.error("Error updating payment status:", error);
        }
    };

    const statuses = ["pending", "completed", "failed"];

    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100">
            <motion.h2
                className="text-3xl font-bold text-blue-700 text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Manage Payments
            </motion.h2>

            {loading ? (
                <p className="text-center text-gray-600">Loading payments...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {payments.map((payment) => {
                        // Log the payment object to debug its structure
                        console.log('Payment:', payment);

                        return (
                            <motion.div
                                key={payment._id}
                                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-3 mb-3 text-lg text-gray-800">
                                    <FaUserAlt className="text-blue-500" />
                                    {/* Check if user exists and if name is available */}
                                    {payment.user?.name || "N/A"}
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                    <FaMoneyCheckAlt className="text-green-500" />
                                    Order ID: {payment.order?._id || "N/A"}
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                    <FaRupeeSign className="text-yellow-500" />
                                    {/* Ensure payment.amount is a valid number */}
                                    Amount: ₹{payment.amount && !isNaN(payment.amount) ? payment.amount.toFixed(2) : "0.00"}
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-700 mb-4">
                                    <FaClipboardCheck className="text-purple-500" />
                                    {/* Ensure payment.status exists */}
                                    Status: <span className="capitalize font-semibold text-blue-600">{payment.status || "N/A"}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {statuses.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updatePaymentStatus(payment._id, status)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium border transition
                                                ${payment.status === status
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 hover:bg-blue-100"
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Payments;
