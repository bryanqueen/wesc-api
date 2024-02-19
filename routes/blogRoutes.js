const express = require('express');
const {Router} = express;
const router = Router();
const {blogController } = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');

//Routes
router.post('/', blogController.createBlog);
router.get('/', blogController.viewAllBlogs);
router.get('/:id', blogController.viewSingleBlog);
router.put('/:id', authMiddleware, blogController.editBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog)

module.exports = router;