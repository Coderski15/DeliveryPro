const express = require("express");
const { getAllUsers, getAllCouriers, getAllPayments, deleteUser } = require("../controllers/adminController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin Dashboard API Endpoints
router.get("/users", authenticate, getAllUsers);
router.get("/couriers", authenticate, getAllCouriers);
router.get("/payments", authenticate, getAllPayments);
router.delete("/users/:id", authenticate, deleteUser);

module.exports = router;
