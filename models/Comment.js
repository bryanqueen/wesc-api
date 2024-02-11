const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   
    comment: {
       type: String,
       required: true
    },
     firstname: {
      type: String,
      required: true
     },
     email: {
      type: String,
      required: true
     },
     reply: {
      type: String,
     },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
