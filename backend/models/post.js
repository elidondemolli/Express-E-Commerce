const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true,
    },
    discount_price: {
        type: Number,
    },
    discount_code: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);