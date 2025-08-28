const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: Number,
        enum: [2], // 1 for client, 2 for admin
        default: 2 // Default to client
    },
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
