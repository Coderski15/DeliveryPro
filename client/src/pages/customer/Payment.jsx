import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../lib/axios";

const Payment = () => {
    const [couriers, setCouriers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCouriers();
    }, []);

    const fetchCouriers = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await client.get("/courier/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCouriers(response.data);
        } catch (error) {
            console.error("Error fetching couriers", error);
        }
    };

    const handlePayment = (orderId, amount) => {
        navigate("/payment", { state: { orderId, amount } });
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {couriers.map((courier) => (
                    <div key={courier._id} className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="font-semibold">{courier.deliveryType} Delivery</h3>
                        <p>Pickup: {courier.pickupAddress}</p>
                        <p>Delivery: {courier.deliveryAddress}</p>
                        <p>Cost: ₹{courier.cost}</p>
                        <p>Status: {courier.status}</p>
                        {!courier.isPaid && (
                            <button
                                onClick={() => handlePayment(courier._id, courier.cost)}
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Payment;
