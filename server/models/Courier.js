const mongoose = require("mongoose");

const CourierSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deliveryPerson: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    packageDetails: {
        weight: { type: Number, required: true },
        size: { type: String, required: true },
    },
    deliveryType: { type: String, enum: ["Standard", "Express"], required: true },
    cost: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "picked up", "in transit", "delivered"],
        default: "pending"
    },
    tracking: [
        {
            location: {
                type: {
                    latitude: { type: Number, required: true, default: 0 },
                    longitude: { type: Number, required: true, default: 0 },
                },
            },
            status: { type: String },
            timestamp: { type: Date, default: Date.now },
        }
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Courier", CourierSchema);
