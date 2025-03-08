const Payment = require("../models/Payment");
const Courier = require("../models/Courier");

// 📌 Create a new payment
const createPayment = async (req, res) => {
    try {
        const { orderId, amount, paymentMethod, transactionId } = req.body;
        const userId = req.user; // Extracted from JWT

        // Check if order exists
        const order = await Courier.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const newPayment = new Payment({
            user: userId,
            order: orderId,
            amount,
            paymentMethod,
            transactionId,
            status: "pending"
        });

        await newPayment.save();
        res.status(201).json({ message: "Payment initiated", payment: newPayment });

    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// 📌 Get all payments for a user
const getUserPayments = async (req, res) => {
    try {
        const userId = req.user;
        const payments = await Payment.find({ user: userId }).populate("order", "pickupAddress deliveryAddress status");

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 📌 Get payment details by ID
const getPaymentById = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId).populate("order", "pickupAddress deliveryAddress status");

        if (!payment) return res.status(404).json({ error: "Payment not found" });

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 📌 Update payment status (Admin or Automated Payment Gateway)
const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentId, status } = req.body;

        const updatedPayment = await Payment.findByIdAndUpdate(
            paymentId,
            { status },
            { new: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        res.status(200).json({ message: "Payment status updated", payment: updatedPayment });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    createPayment,
    getUserPayments,
    getPaymentById,
    updatePaymentStatus
};
