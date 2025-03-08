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
