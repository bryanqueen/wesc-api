const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const JobsBanner = require('../models/JobsBanner');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Jobs_Image',
        format: async (req, res) => 'png'
    }

});

const jobBannerImageparser = multer({storage: storage});

const jobsbannerController = {
    postBanner: async (req, res) => {
        try {
            const jobBannnerImage = req.file.path;
            const uploadedJobImage = await cloudinary.v2.uploader.upload(jobBannnerImage);

            const newJobPosting = new JobsBanner({
                jobBannerImage: uploadedJobImage.secure_url
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

module.exports = {
    jobsbannerController,
    jobBannerImageparser
}