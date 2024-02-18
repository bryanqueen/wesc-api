const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const JobsBanner = require('../models/JobsBanner');




const storage = multer.diskStorage({
    destination: './',
    filename: function(req, res, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage, limits: {fileSize: 10 * 1024 * 1024} })

const jobsbannerController = {
    postBanner: async (req, res) => {

        //using multer to handle file uploads
        upload.fields([
            {name: 'job-image', maxCount: 1}
        ])(req, res, async (err) => {
            if (err) {
              return res.status(400).json({ error: err.message });
             }
           })
           //Retrieve Files from the request object
           const image = req.files.image[0];
        try {
            const uploadedJobImage = await cloudinary.uploader.upload(image.path, {
                folder: 'job_banner',
              })

            const newJobPosting = new JobsBanner({
                image: uploadedJobImage.secure_url
            });
            await newJobPosting.save();
            res.json(newJobPosting)
        } catch (error) {
            res.status(500).json({error: 'An error occured while trying to post this banner, please try again'})
        }
    },

    getAllBanners: async (req, res) => {
        try {
            const Jobs = await JobsBanner.find({});

            if (!Jobs){
                return res.status(404).json({error: 'Jobs Not Found'})
            }
            res.json(Jobs)
        } catch (error) {
            res.status(500).json({error: 'An error occured while trying to fetch banner, please try again'})
        }
    },

    deleteBanner: async (req, res) => {
        try {
            const JobId = req.params.id;

            const deleteJob = await JobsBanner.findById(JobId);

            if (!deleteJob){
                return res.status(404).json({error:'Job Not Found'})
            }
        } catch (error) {
           res.status(500).json({error: 'An error occured while trying to delete this banner, please re-try'}) 
        }
    }
};

module.exports = jobsbannerController