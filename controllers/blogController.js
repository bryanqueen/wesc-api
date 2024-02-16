const Blog = require('../models/Blog');
const multer = require('multer');
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'blog_cover',
      format: async (req, res) => 'png'
    },
  });

  const displayImageParser = multer({ storage: storage });

const blogController = {
    createBlog: async (req, res) => {
        try {
            const {title, body, author} = req.body;
            const displayImage = req.file.path;
            const uploadedImage = await cloudinary.v2.uploader.upload(displayImage);
            const newBlog = new Blog({
                title,
                body,
                author,
                displayImage: uploadedImage.secure_url
            });

            await newBlog.save()
            res.json(newBlog)
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

            const {title, body, author} = req.body;
            let displayImage;
            if (req.file){
                const uploadedImage = await cloudinary.uploader.upload(req.file.path);
                displayImage = uploadedImage.secure_url;
            }
            
            const blogToBeEdited = await Blog.findByIdAndUpdate(
                blogId,
                {
                    title,
                    body,
                    author,
                    displayImage
                },
                {new: true}
            );

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

module.exports = {
    blogController,
    displayImageParser
}
