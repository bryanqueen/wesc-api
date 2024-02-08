const JobsBanner = require('../models/JobsBanner');

const jobsbannerController = {
    postBanner: async (req, res) => {
        try {
            
        } catch (error) {
            res.status(500).json({error: 'An error occured while trying to post this banner, please try again'})
        }
    },

    getBanner: async (req, res) => {
        try {
            
        } catch (error) {
            res.status(500).json({error: 'An error occured while trying to fetch banner, please try again'})
        }
    },

    deleteBanner: async (req, res) => {
        try {
            
        } catch (error) {
           res.status(500).json({error: 'An error occured while trying to delete this banner, please re-try'}) 
        }
    }
};

module.exports = jobsbannerController;