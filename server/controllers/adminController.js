const User = require("../models/User");
const Courier = require("../models/Courier");
const Payment = require("../models/Payment");

// Fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Fetch all couriers
exports.getAllCouriers = async (req, res) => {
    try {
        const couriers = await Courier.find().populate("customer deliveryPerson");
        res.status(200).json(couriers);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch couriers" });
    }
};

// Fetch all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("user order");
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch payments" });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};

// Update courier status
exports.updateCourierStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const courier = await Courier.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate("customer deliveryPerson");

        if (!courier) {
            return res.status(404).json({ message: "Courier not found" });
        }

        res.status(200).json(courier);
    } catch (error) {
        res.status(500).json({ message: "Failed to update courier status" });
    }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const payment = await Payment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate("user order");

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: "Failed to update payment status" });
    }
};

// Update user info
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user" });
    }
};

// Delete courier
exports.deleteCourier = async (req, res) => {
    try {
        const { id } = req.params;
        await Courier.findByIdAndDelete(id);
        res.status(200).json({ message: "Courier deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete courier" });
    }
};

// Delete payment
exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        await Payment.findByIdAndDelete(id);
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete payment" });
    }
};
