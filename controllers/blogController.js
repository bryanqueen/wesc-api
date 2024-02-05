const Blog = require('../models/Blog')

const blogController = {
    createBlog: async (req, res) => {
        try {
            const {title, displayImage, body} =  req.body;

            const newBlog = new Blog({
                title,
                displayImage,
                body
            });

            await newBlog.save();

            res.json({message: 'You just created a Blog post'})
        } catch (error) {
            return res.status(500).json({error: 'Ooops!! an error occured while trying to post this blog, please try again.'})
        }
    },
    viewAllBlogs: async (req, res) => {
        try {
            const Blogs = await Blog.find({});

            if (!Blogs) {
                return res.status(404).json({error:'Blogs Not Found'})
            }
            res.json(Blogs)
        } catch (error) {
            return res.status(500).json({error: 'Ooops!! an error occured, please refresh'})
        }
    },
    viewSingleBlog: async (req, res) => {
        try {
            const blogId = req.params.id;

            const blogToBeViewed = await Blog.findById(blogId);
    
            if (!blogToBeViewed) {
                return res.status(404).json({error: 'Not Found'})
            }
        } catch (error) {
            return res.status(500).json({error: 'Ooops!! an error occured, please refresh'})
        }
    },
    editBlog: async (req, res) => {
        try {
            const blogId = req.params.id;
            
            const blogToBeEdited = await Blog.findByIdAndUpdate(blogId);

            if(!blogToBeEdited) {
                return res.status(404).json({error: 'Blog Not Found'})
            }
        } catch (error) {
            return res.status(500).json({error: 'Ooops!! an error occured, please refresh'})
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const blogId = req.params.id;

            const blogToBeDeleted = await Blog.findByIdAndDelete(blogId);

            if (!blogToBeDeleted) {
                return res.status(404).json({error: 'Not Found'})
            }
        } catch (error) {
            return res.status(500).json({error: 'Ooops!! an error occured, please refresh'})
        }
    }
}

module.exports = blogController;
