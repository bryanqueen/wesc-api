const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
       type: String,
       required: true
    },
      parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      },
      
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
