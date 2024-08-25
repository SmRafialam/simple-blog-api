const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A Blog Post must have a title"],
        unique: true
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('blogAPI', blogPostSchema);

module.exports = Post;