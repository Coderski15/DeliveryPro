const express = require("express");
const { createCourier, getCustomerCouriers, assignDeliveryPerson, updateTracking, getCourierTracking, getAvailableCouriers, getDeliveryCouriers } = require("../controllers/courierController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Customer creates a new courier booking
router.post("/", authenticate, createCourier);

// ✅ Customer gets all their courier orders
router.get("/", authenticate, getCustomerCouriers);
router.get("/delivery", authenticate, getDeliveryCouriers);
router.get("/available", authenticate, getAvailableCouriers);

// ✅ Admin assigns a delivery person to a courier
router.put("/assign", authenticate, assignDeliveryPerson);

// ✅ Delivery person updates tracking
router.put("/tracking", authenticate, updateTracking);

// ✅ Customer fetches tracking details
router.get("/tracking/:courierId", authenticate, getCourierTracking);

module.exports = router;
