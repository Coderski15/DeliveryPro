// PACKAGES
const mongoose = require('mongoose');

// SCHEMA DEFINITION
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'] },
    password: { type: String, required: true },
    phone: { type: Number },
    role: { type: String, enum: ["customer", "delivery"], required: true },
    address: { type: String }, // Only needed for customers
    isAdmin: { type: Boolean, default: false },
}, {
    timestamps: true,  // AUTOMATICALLY ADDS createdAt AND updatedAt FIELDS
});

// CREATE USER MODEL
const User = mongoose.model('User', userSchema);

// EXPORT USER MODEL
module.exports = User;
