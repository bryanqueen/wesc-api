const Comment = require('../models/Comment');


const commentController = {
    addComment: async (req, res) => {
        try {
            const {firstname, email, comment} = req.body;

            const newComment = new Comment({
                firstname,
                email,
                comment
            });

            await newComment.save();

            res.json(newComment);
        } catch (error) {
            return res.status(500).json({error: 'An error occured, please try again later'});
        }
    },
    replyToComment: async (req, res) => {
        try {
            const CommentId = req.params.id;
            const reply = req.body;

            const existingComment = await Comment.findById(CommentId);

            if (!existingComment){
                return res.status(404).json({error: 'Comment Not Found'})
            }
            if(existingComment.reply){
                return res.status(400).json({message: 'Sorry, this comment already has a reply'})
            }
            existingComment.reply = reply;

            const savedComment = await existingComment.save();
            res.json(savedComment)
        } catch (error) {
            return res.status(500).json({error: 'An error occured, please try again'})
        }
    },
    getCommentsForBlog: async (req, res) => {
        try {
            const BlogId = req.params.id;

            const comments = await Comment.find({BlogId});
            res.json(comments);
        } catch (error) {
            return res.status(500).json({error: 'An error occured, please try again'})
        }
    }
}
module.exports = commentController;