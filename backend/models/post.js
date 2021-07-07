const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: {
        type: String,
        data: Buffer
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);