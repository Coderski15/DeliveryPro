const express = require("express");
const {
    getAllUsers,
    getAllCouriers,
    getAllPayments,
    deleteUser,
    updateCourierStatus,
    updatePaymentStatus,
    updateUser,
    deleteCourier,
    deletePayment,
} = require("../controllers/adminController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin Dashboard API Endpoints
router.get("/users", authenticate, getAllUsers);
router.get("/couriers", authenticate, getAllCouriers);
router.get("/payments", authenticate, getAllPayments);
router.delete("/users/:id", authenticate, deleteUser);

// New Admin CRUD routes
router.put("/users/:id", authenticate, updateUser);
router.delete("/couriers/:id", authenticate, deleteCourier);
router.put("/couriers/:id/status", authenticate, updateCourierStatus);
router.put("/payments/:id/status", authenticate, updatePaymentStatus);
router.delete("/payments/:id", authenticate, deletePayment);

module.exports = router;
