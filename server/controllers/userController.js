// PACKAGES
const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// COOKIE CONFIGURATION
const cookieOptions = {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    maxAge: 3600000, // 1 hour
    sameSite: "Strict", // Adjust if handling cross-origin
};

// REGISTER FUNCTION
const registerUser = async (req, res) => {
    const { name, email, password, phone, role, address } = req.body;

    try {
        // CHECK IF USER ALREADY EXISTS
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role, // 'customer' or 'delivery'
            address,
        });

        await user.save();

        // GENERATE TOKEN
        const token = generateToken(user._id);

        // SET JWT TOKEN AS HTTPONLY COOKIE
        res.cookie("token", token, cookieOptions);

        // SEND RESPONSE
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isAdmin: user.isAdmin
            },
            token: token,
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN FUNCTION
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // FIND USER BY EMAIL
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // COMPARE PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // GENERATE JWT TOKEN
        const token = generateToken(user._id);

        // SET TOKEN AS HTTPONLY COOKIE
        res.cookie("token", token, cookieOptions);

        // SEND RESPONSE
        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isAdmin: user.isAdmin
            },
            token: token,
        });
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// VERIFY USER (PROTECTED ROUTE)
const verifyUser = async (req, res) => {
    try {
        const userId = req.user; // Decoded userId from authentication middleware
        const user = await User.findById(userId).select("-password"); // Exclude password field

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User is authenticated",
            user,
        });
    } catch (error) {
        console.error("Error in verifyUser:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// LOGOUT FUNCTION
const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

module.exports = { registerUser, loginUser, verifyUser, logout };
