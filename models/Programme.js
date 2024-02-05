const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const programmeSchema = new Schema({
    programType: {
        type: String,
        required: true
    },
    programName: {
        type: String,
        required: true
    },
    tuitionFee: {
        type: String,
        required: true
    },
    applicationFee: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    appCode: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = Programme = model('Programme', programmeSchema)