import { useState, useEffect } from "react";
import client from "../../lib/axios";

const Payment = () => {
    const [couriers, setCouriers] = useState([]);
    const [selectedCourier, setSelectedCourier] = useState(null);

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

    const handlePayment = (courier) => {
        setSelectedCourier(courier);
    };

    const closeModal = () => {
        setSelectedCourier(null);
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
                                onClick={() => handlePayment(courier)}
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Payment Modal */}
            {selectedCourier && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-semibold mb-4 text-center">Complete Your Payment</h3>
                        <p><strong>Order ID:</strong> {selectedCourier._id}</p>
                        <p><strong>Amount:</strong> ₹{selectedCourier.cost}</p>
                        <p><strong>Delivery:</strong> {selectedCourier.deliveryType}</p>
                        <p><strong>From:</strong> {selectedCourier.pickupAddress}</p>
                        <p><strong>To:</strong> {selectedCourier.deliveryAddress}</p>

                        {/* Payment QR Image */}
                        <div className="mt-4 flex justify-center">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=your-upi-id@bank&pn=DeliveryPro&am=${selectedCourier.cost}`}
                                alt="QR Code for Payment"
                                className="w-40 h-40"
                            />
                        </div>
                        <p className="text-sm text-center text-gray-600 mt-2">
                            Scan this QR code with any UPI app to pay.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
