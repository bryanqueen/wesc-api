const Comment  = require('../models/Comment')
const Blog = require('../models/Blog')
const commentController = {
    addComment: async (req, res) => {
        try {
            const blogId = req.params.id;
           const {comment, commenter} = req.body;

           //Check if the blog exits
           const blog = await Blog.findById(blogId);

           if (!blog) {
            return res.status(404).json({error: 'Blog Not Found'});
           }

           const newComment = new Comment({
            comment,
            commenter
           });

           await newComment.save();

           //Add the comment to the blog's comment Array
           blog.comments.push(newComment._id);

           await blog.save();
        } catch (error) {
            return res.status(500).json({error: 'An error occured while trying to add your comment, please try again'})
        }
    },
    getCommentsByBlogId: async (req, res) => {
        try {
            const blogId = req.params.id;

            //Check if the blog exists
            const blog = await Blog.findById(blogId);

            if (!blog) {
                return res.status(404).json({error: 'Blog not Found'})
            }

            //Populate comments and replies to get author details

                await blog.populate({
                    path: 'comments',
                }).execPopulate();   

            //Calculate Comment and reply counts
            const commentCount = blog.comments.length;
            

            // Assuming replies are dynamically queried in the previous step, you can calculate replyCount as follows:
            const replyCount = blog.comments.reduce((total, comment) => {
                const replies = blog.comments.filter(reply => String(reply.parentComment) === String(comment._id));
                return total + replies.length;
            }, 0);
            //Include Counts in the response
            const commentsWithCounts = blog.comments.map(comment => ({
                _id: comment._id,
                comment: comment.comment,
                commenter: comment.commenter,
                createdAt: comment.createdAt,
                parentComment: comment.parentComment,
            }));

            res.status(200).json({
                commentCount,
                replyCount,
                comments: commentsWithCounts
            })
        } catch (error) {
            return res.status(500).json({error: 'An error occured while trying to  fetch comments'})
        }
    },
    addReply: async (req, res) => {
        try {
            const commentId = req.params.id;
            const {comment, commenter} = req.body;

            //Check If Comment exists
            const parentComment = await Comment.findById(commentId);
            if (!parentComment) {
                return res.status(404).json({error: 'Comment Not Found'})
            }

            //Create a new reply
            const newReply = new Comment({
                comment,
                commenter,

            });

            //Save the reply
            await newReply.save()
        } catch (error) {
            return res.status(500).json({error: 'An error occured while trying to add your reply, please try again'})
        }
    },
    updateComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const {comment} = req.body;

            //Check if the comment exists
            const updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                {comment},
                {new: true}
            );

            //Save updated comment
            await updatedComment.save();

            res.json(updatedComment)
        } catch (error) {
            return res.status(500).json({error: 'An error occured while trying to update this comment, please try again'})
        }
    },
    deleteComment: async (req, res) => {
        try {
            const commentId  = req.params.id;
        
            // Check if the comment exists
            const comment = await Comment.findById(commentId);
            if (!comment) {
              return res.status(404).json({ error: 'Comment not found' });
            }
        
            // If the comment is a parent comment, delete all its child comments (replies) as well
            if (!comment.parentComment) {
              await Comment.deleteMany({ parentComment: comment._id });
            }
        
            // Remove the comment from its parent (if any)
            if (comment.parentComment) {
              const parentComment = await Comment.findById(comment.parentComment);
              if (parentComment) {
                parentComment.replies = parentComment.replies.filter(
                  (reply) => String(reply._id) !== String(comment._id)
                );
                await parentComment.save();
              }
            }
        
            // Remove the comment from the database
            await comment.remove();
        
            res.status(204).send();

        } catch (error) {
            return res.status(500).json({error: 'An error occured while trying to delete this comment, please try again'})
        }
    }
}

module.exports = commentController;