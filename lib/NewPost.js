const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
});

module.exports = mongoose.model('NewPost', postSchema);
