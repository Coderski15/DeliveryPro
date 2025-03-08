const Courier = require("../models/Courier");

// 📌 Create a new courier order
const createCourier = async (req, res) => {
    try {
        const { pickupAddress, deliveryAddress, weight, size, deliveryType, cost } = req.body;
        const customerId = req.user; // Extracted from JWT

        // Ensure all required fields are present
        if (!pickupAddress || !deliveryAddress || !weight || !size || !deliveryType || !cost) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newCourier = new Courier({
            customer: customerId,
            pickupAddress,
            deliveryAddress,
            packageDetails: {
                weight,
                size,
            },
            deliveryType,
            cost,
        });

        await newCourier.save();
        res.status(201).json({ message: "Courier booked successfully", courier: newCourier });
    } catch (error) {
        console.error("Error creating courier:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// 📌 Get all courier orders for a customer
const getCustomerCouriers = async (req, res) => {
    try {
        const customerId = req.user;
        const couriers = await Courier.find({ customer: customerId }).populate("deliveryPerson", "email");

        res.status(200).json(couriers);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
const getDeliveryCouriers = async (req, res) => {
    try {
        const deliveryId = req.user;

        const couriers = await Courier.find({ deliveryPerson: deliveryId })

        res.status(200).json(couriers);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const getAvailableCouriers = async (req, res) => {
    try {
        const couriers = await Courier.find().populate("deliveryPerson", "email");
        res.status(200).json(couriers);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 📌 Assign a delivery person to a courier (Admin or automated system)
const assignDeliveryPerson = async (req, res) => {
    try {
        const deliveryPersonId = req.user;
        const { courierId } = req.body;
        const updatedCourier = await Courier.findByIdAndUpdate(
            courierId,
            { deliveryPerson: deliveryPersonId },
            { new: true }
        );

        if (!updatedCourier) {
            return res.status(404).json({ error: "Courier not found" });
        }

        res.status(200).json({ message: "Delivery person assigned", courier: updatedCourier });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 📌 Update courier tracking by delivery person
const updateTracking = async (req, res) => {
    try {
        const { courierId, latitude, longitude, status } = req.body;
        const deliveryPersonId = req.user;

        const courier = await Courier.findById(courierId);
        if (!courier) return res.status(404).json({ error: "Courier not found" });

        if (courier.deliveryPerson.toString() !== deliveryPersonId.toString()) {
            return res.status(403).json({ error: "Unauthorized to update this courier" });
        }

        if (courier.tracking.length > 0) {
            // Update last tracking entry
            const lastTracking = courier.tracking[courier.tracking.length - 1];
            lastTracking.location.latitude = latitude;
            lastTracking.location.longitude = longitude;
            lastTracking.status = status;
        } else {
            // If no tracking exists, create the first one
            courier.tracking.push({ location: { latitude, longitude }, status });
        }

        if (status === "delivered") {
            courier.status = "delivered";
        } else if (status === "in transit") {
            courier.status = "in transit";
        } else if (status === "picked up") {
            courier.status = "picked up";
        }

        await courier.save();
        res.status(200).json({ message: "Tracking updated", courier });

    } catch (error) {
        console.error("Error updating tracking:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// 📌 Get courier tracking info for a customer
const getCourierTracking = async (req, res) => {
    try {
        const { courierId } = req.params;
        const courier = await Courier.findById(courierId).populate("deliveryPerson", "email");

        if (!courier) return res.status(404).json({ error: "Courier not found" });

        res.status(200).json(courier.tracking);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    createCourier,
    getCustomerCouriers,
    assignDeliveryPerson,
    updateTracking,
    getCourierTracking,
    getAvailableCouriers,
    getDeliveryCouriers
};
