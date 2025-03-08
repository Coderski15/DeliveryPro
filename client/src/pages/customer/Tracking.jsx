import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import client from "../../lib/axios";

const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 13);
    }, [position, map]);
    return null;
};

const Tracking = () => {
    const [position, setPosition] = useState([19.076, 72.8777]); // Default: Mumbai
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [couriers, setCouriers] = useState([]);
    const [courierId, setCourierId] = useState(null);

    useEffect(() => {
        fetchCouriers();
    }, []);

    useEffect(() => {
        if (courierId) {
            fetchTrackingData();
            const interval = setInterval(fetchTrackingData, 5000); // Auto-refresh every 5s
            return () => clearInterval(interval);
        }
    }, [courierId]);

    const fetchCouriers = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await client.get("/courier", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.length > 0) {
                setCouriers(response.data);
                setCourierId(response.data[0]._id); // Get the first courier's ID
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching couriers", error);
            setError("Failed to load courier data");
            setLoading(false);
        }
    };

    const fetchTrackingData = async () => {
        try {
            if (!courierId) return;

            const token = localStorage.getItem("authToken");
            const response = await client.get(`/courier/tracking/${courierId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.length > 0) {
                const lastLocation = response.data[response.data.length - 1].location;
                setPosition([lastLocation.latitude, lastLocation.longitude]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tracking data", error);
            setError("Failed to load tracking data");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" /> Tracking
            </h2>

            {loading ? (
                <p>Loading tracking data...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <MapContainer center={position} zoom={13} className="h-96 w-full rounded-lg">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <RecenterMap position={position} />
                    <Marker key={position.toString()} position={position}></Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default Tracking;
