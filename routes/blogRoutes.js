const express = require('express');
const {Router} = express;
const router = Router();
const {blogController, displayImageParser } = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');

//Routes
router.post('/', authMiddleware, displayImageParser.single('displayImage'), blogController.createBlog);
router.get('/', blogController.viewAllBlogs);
router.get('/:id', blogController.viewSingleBlog);
router.put('/:id', authMiddleware, displayImageParser.single('displayImage'), blogController.editBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog)

module.exports = router;