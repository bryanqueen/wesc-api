const express = require('express');
const {Router} = express;
const router = Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth')

//Routes
router.post('/add-comment', authMiddleware, commentController.addComment );
router.get('/:id', commentController.getCommentsForBlog);
router.post('/add-reply', authMiddleware, commentController.replyToComment);



module.exports = router;