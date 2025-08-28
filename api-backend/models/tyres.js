const mongoose = require('mongoose');

const tyresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    size: {
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        radius: {
            type: Number,
            required: true
        }
    },
    image: {
        type: String, // You can store image URL or file path
        required: true
    },
    brand: {
        type: String,
        required: true 
    },
    type: {
        type: String,
        required: true 
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    }
});

const Tyres = mongoose.model('Tyres', tyresSchema);
module.exports = Tyres;
