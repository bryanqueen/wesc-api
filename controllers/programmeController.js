const Programme = require('../models/Programme');

const programmeController = {
    createProgramme: async (req, res) => {
        try {
            const {
                programType,
                programName,
                tuitionFee,
                applicationFee,
                duration,
                appCode,
                location
            } = req.body;

            const programme = new Programme({
                programType,
                programName,
                tuitionFee,
                applicationFee,
                duration,
                appCode,
                location
            });

            await programme.save()
        } catch (error) {
            res.status(500).json({error: 'An error occured while trying to create a Programme'})
        }
    },
    viewAllProgrammes: async (req, res) => {
        try {
            const programmes = await Programme.find();

            if(!programmes){
                return res.status(404).json({error: 'No Programmes Available'})
            }
            res.json(programmes)
        } catch (error) {
            res.status(500).json({error: 'An error occured'})
        }
    },
    editProgramme: async (req, res) => {
        try {
            const programmeId = req.params.id;

            const updateProgramme = await Programme.findByIdAndUpdate(
                programmeId,
                {
                    programType,
                    programName,
                    tuitionFee,
                    applicationFee,
                    duration,
                    appCode,
                    location
                },
                {new: true}
            );

            if(!updateProgramme){
                return res.status(404).json({error: 'Programme to be updated not found'})
            }
            res.json({message: 'Programme updated successfully'})
        } catch (error) {
            res.status(500).json({error: 'An error occured while trying to edit this'})
        }
    },
    deleteProgramme: async (req, res) => {
        try {
            const programmeId = req.params.id;

            const deleteProgramme = await Programme.findByIdAndDelete(programmeId);

            if(!deleteProgramme){
                return res.status(404).json({error: 'Programme to be deleted not found'})
            }
            res.json({message: 'Programme deleted successfully'})
        } catch (error) {
            res.status(500).json({error: 'An error occured'})
        }
    }
};
module.exports = programmeController;