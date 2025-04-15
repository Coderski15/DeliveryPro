const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["sent", "pending", "failed"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", NotificationSchema);
