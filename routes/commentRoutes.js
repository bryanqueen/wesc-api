const express = require('express');
const {Router} = express;
const router = Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth')

//Routes
router.post('/add-comment', authMiddleware, commentController.addComment );
router.get('/:id', commentController.getCommentsByBlogId);
router.post('/add-reply', authMiddleware, commentController.addReply);
router.put('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, commentController.deleteComment);


module.exports = router;