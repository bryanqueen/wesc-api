const Blog = require('../models/Blog');
const multer = require('multer');
const cloudinary = require('cloudinary').v2


const storage = multer.diskStorage({
    destination: './',
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

// Limit is by default set to 1mb but using the limit property we can set it to 10MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
  }).single('image');
  

const blogController = {
    createBlog: async (req, res) => {
        // Use multer to handle file uploads
    upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
  
        try {
          // Retrieve uploaded file from request object
          const image = req.file;
  
          // Check if image file exists
          if (!image) {
            return res.status(400).json({ error: 'Image file is required' });
          }
  
          // Handle other form fields
          const { title, body, author } = req.body;
  
          const uploadedImage = await cloudinary.uploader.upload(image.path, {
            folder: 'blog_image_covers',
          });
  
          const newBlog = new Blog({
            title,
            body,
            author,
            image: uploadedImage.secure_url
          });
  
          await newBlog.save();
          res.json(newBlog);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'An error occurred while creating the blog' });
        }
      });
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
        const { title, body, author } = req.body;

        // Retrieve the blog post by its ID
        let blogToBeEdited = await Blog.findById(blogId);

        // Check if the blog post exists
        if (!blogToBeEdited) {
            return res.status(404).json({ error: 'Blog Not Found' });
        }

        // Update the fields if they are provided in the request body
        if (title) {
            blogToBeEdited.title = title;
        }
        if (body) {
            blogToBeEdited.body = body;
        }
        if (author) {
            blogToBeEdited.author = author;
        }

        // Handle image editing if a new image is provided in the request
        if (req.files && req.files.image) {
            const newImage = req.files.image[0];
            const uploadedImage = await cloudinary.uploader.upload(newImage.path, {
                folder: 'blog_image_covers',
            });
            blogToBeEdited.image = uploadedImage.secure_url;
        }

        // Save the changes
        await blogToBeEdited.save();

        // Return the updated blog post
        res.json(blogToBeEdited);
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
    blogController
}
