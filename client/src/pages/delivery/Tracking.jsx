import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"; //gets the map to locate and gets lattitude and longitute 
import client from "../../lib/axios";
import { FaTruckMoving, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import { toast } from "react-hot-toast";

const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 13);
    }, [position, map]);
    return null;
};

const Tracking = () => {
    const [courier, setCourier] = useState(null);
    const [courierId, setCourierId] = useState(null);
    const [status, setStatus] = useState("picked up");
    const [position, setPosition] = useState([19.076, 72.8777]); // Default to Mumbai coords

    useEffect(() => {
        fetchTrackingData();
    }, []);

    const fetchTrackingData = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await client.get("/courier/delivery", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.length > 0) {
                const activeCourier = response.data[0];
                setCourier(activeCourier);
                setCourierId(activeCourier._id);
                if (activeCourier.tracking.length > 0) {
                    const lastLocation = activeCourier.tracking[activeCourier.tracking.length - 1].location;
                    setPosition([lastLocation.latitude, lastLocation.longitude]);
                }
            }
        } catch (error) {
            console.error("Error fetching tracking data", error);
        }
    };

    const updateTracking = async () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
                const token = localStorage.getItem("authToken");
                const response = await client.put(
                    "/courier/tracking",
                    { courierId, latitude, longitude, status },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setPosition([latitude, longitude]);
                setCourier(response.data.courier);
                toast.success("Tracking updated successfully!");
            } catch (error) {
                console.error("Error updating tracking", error);
                toast.error("Failed to update tracking");
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaTruckMoving className="mr-2 text-blue-600" /> Tracking
            </h2>

            {courier && (
                <div className="mb-4 p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-semibold flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-700" /> Active Delivery
                    </h3>
                    <p className="text-gray-600"><strong>Pickup:</strong> {courier.pickupAddress}</p>
                    <p className="text-gray-600"><strong>Drop-off:</strong> {courier.deliveryAddress}</p>
                    <p className="text-gray-600"><strong>Weight:</strong> {courier.packageDetails.weight} kg</p>
                    <p className="text-gray-600"><strong>Size:</strong> {courier.packageDetails.size}</p>
                </div>
            )}

            {courier && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-green-100 text-green-700 flex items-center rounded"
                >
                    <FaCheckCircle className="mr-2" /> Current Status: {status}
                </motion.div>
            )}

            <MapContainer center={position} zoom={13} className="h-64 w-full rounded-lg">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <RecenterMap position={position} />
                <Marker key={position.toString()} position={position}></Marker>
            </MapContainer>

            <div className="mt-4 space-y-3">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="picked up">Picked Up</option>
                    <option value="in transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                </select>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={updateTracking}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Update Tracking
                </motion.button>
            </div>
        </div>
    );
};

export default Tracking;