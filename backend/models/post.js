const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: {
        type: String,
        data: Buffer
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);