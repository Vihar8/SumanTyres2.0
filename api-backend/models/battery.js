const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    image: {
        type: String, // You can store image URL or file path
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Batterys = mongoose.model('Batterys', batterySchema);
module.exports = Batterys;
