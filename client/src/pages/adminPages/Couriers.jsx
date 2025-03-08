import { useEffect, useState } from "react";
import client from "../../lib/axios";

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

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Couriers</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Customer</th>
                            <th className="border border-gray-300 p-2">Pickup</th>
                            <th className="border border-gray-300 p-2">Delivery</th>
                            <th className="border border-gray-300 p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {couriers.map((courier) => (
                            <tr key={courier._id} className="border border-gray-300">
                                <td className="p-2 border">{courier.customer?.name || "N/A"}</td>
                                <td className="p-2 border">{courier.pickupAddress}</td>
                                <td className="p-2 border">{courier.deliveryAddress}</td>
                                <td className="p-2 border">{courier.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Couriers;
