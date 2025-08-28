const mongoose = require('mongoose');

const oilsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    type: {
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

const Oils = mongoose.model('Oils', oilsSchema);
module.exports = Oils;
