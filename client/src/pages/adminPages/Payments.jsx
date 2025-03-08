import { useEffect, useState } from "react";
import axios from "../../lib/axios";

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

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Payments</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">User</th>
                            <th className="border border-gray-300 p-2">Order ID</th>
                            <th className="border border-gray-300 p-2">Amount</th>
                            <th className="border border-gray-300 p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id} className="border border-gray-300">
                                <td className="p-2 border">{payment.user?.name || "N/A"}</td>
                                <td className="p-2 border">{payment.order}</td>
                                <td className="p-2 border">${payment.amount.toFixed(2)}</td>
                                <td className="p-2 border">{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Payments;
