const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    discount_token: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    code: {
        type: Number,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Discount', discountSchema);