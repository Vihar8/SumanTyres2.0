const userModel = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Signup Controller
const signup = async (req, res) => {
    try {
        const { email, password } = req.body; // Added mobile

        // Check if all fields are provided
        if (!email || !password) { // Added check for mobile
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // Default role to 1 (client) if not provided
        const userRole = 2;


        // Check if the user already exists
        const existsUser = await userModel.findOne({ email });
        if (existsUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create a new user
        const user = new userModel({
            email,
            password: hashedPassword,
            role: userRole,
        });

        await user.save();

        return res.status(201).json({ success: true, message: "User signed up successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Login Controller (No change needed for mobile field)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
       
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare the password
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '2h' } // Token expires in 2 hours
        );

        // Respond with the token and user details
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                mobile: user.mobile, // Include mobile in the response
                user_type: user.user_type
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get Profile Controller (No change needed for mobile)
const getProfile = async (req, res) => {
    try {
        // Access the user from the authenticated request (from the middleware)
        const user = req.user;

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    signup,
    login,
    getProfile,
};
