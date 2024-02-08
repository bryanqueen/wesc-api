const mongoose = require('mongoose');

const jobsbannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
});

module.exports = JobsBanner = mongoose.model('JobsBanner', jobsbannerSchema)