const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = {
    signUp: async (req, res) => {
        try {
            const {username, email, password} = req.body;

            const saltRounds = 12;
            const hashedPassword = bcrypt.hash(password, saltRounds)
            const user = new User({
                username,
                email,
                password: hashedPassword
            })
    
           await user.save();
    
            res.json({message: 'Your account has been successfully created'})
        } catch (error) {
            return res.status(500).json({error: 'An error occured while trying to create your account, please try again'})
        }
    },
    signIn: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(422).json({error: 'Invalid email or password, please try again'})
            }

            const passwordMatch= await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(422).json({error: 'Invalid email or password'})
            }

            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '30m'});

            res.json({message: 'Your account has been successfully created'}, token)
        } catch (error) {
            res.status(500).json({error: 'An error occured while trying to sign you in, please try again'})
        }
    },
    viewProfile: async (req, res) => {
        try {
            const userId = req.userId;

            const profile = await User.findById(userId);

            if (!profile) {
                return res.status(404).json({error: 'Not Found'})
            }

            res.json(profile)
        } catch (error) {
            return res.status(500).json({error: 'Ooops!! an error occured, please refresh'})
        }
    },
    editProfile: async (req, res) => {
        try {
            const userId = req.userId;

            const {username, email, password} = req.body;

            const updateProfile = await User.findByIdAndUpdate(
                userId,
                {username, email, password},
                {new: true}
            );
            if (!updateProfile) {
                return res.status(404).json('Not Found')
            };
            res.json({message: 'Your Profile has been successfully edited'})
        } catch (error) {
            return res.status(500).json({error: 'Ooops!! an error occured, please refresh'})
        }
    },
    deleteProfile: async (req, res) => {
       try {
        const userId = req.userId;

        const deleteProfile = await User.findByIdAndDelete(userId);

        if (!deleteProfile) {
            return res.status(404).json({message: 'Not Found'})
        }
       } catch (error) {
        return res.status(500).json({error: 'Ooops!! an error occured, please refresh'})
       }
    }

}

module.exports = userController;

