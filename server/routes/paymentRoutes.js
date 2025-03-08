const express = require("express");
const { createPayment, getUserPayments, getPaymentById, updatePaymentStatus } = require("../controllers/paymentController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ User initiates a payment
router.post("/", authenticate, createPayment);

// ✅ User gets all their payments
router.get("/", authenticate, getUserPayments);

// ✅ User fetches payment details by ID
router.get("/:paymentId", authenticate, getPaymentById);

// ✅ Admin updates payment status
router.put("/status", authenticate, updatePaymentStatus);

module.exports = router;
