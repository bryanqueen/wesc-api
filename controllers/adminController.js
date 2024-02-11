const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Retry operation function
async function retryOperation(operation, maxRetries, delay) {
    for (let retry = 0; retry < maxRetries; retry++) {
        try {
            return await operation();
        } catch (error) {
            console.error(`Attempt ${retry + 1} failed:`, error);
            if (retry < maxRetries - 1) {
                console.log(`Retrying in ${delay} milliseconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw new Error(`Operation failed after ${maxRetries} attempts`);
}

const userController = {
    signUp: async (req, res) => {
        try {
            const {username, email, password} = req.body;

            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await retryOperation(
                async () => {
                    const admin = new Admin({
                      username,
                      email,
                      password: hashedPassword,
                      
                  });
                  await admin.save();
                },
                3,
                1000
            )
    
    
            res.json({message: 'Your account has been successfully created'})
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'An error occured while trying to create your account, please try again'})
        }
    },
    signIn: async (req, res) => {
        try {
            const {email, password} = req.body;

            const admin = await Admin.findOne({email});

            if (!admin) {
                return res.status(422).json({error: 'Invalid email or password, please try again'})
            }

            const passwordMatch= await bcrypt.compare(password, admin.password);

            if (!passwordMatch) {
                return res.status(422).json({error: 'Invalid email or password'})
            }

            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '30m'});

            res.json({message: 'Sign In Successful'}, token)
        } catch (error) {
            res.status(500).json({error: 'An error occured while trying to sign you in, please try again'})
        }
    },
    viewProfile: async (req, res) => {
        try {
            const userId = req.userId;

            const profile = await Admin.findById(userId);

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

            const updateProfile = await Admin.findByIdAndUpdate(
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

        const deleteProfile = await Admin.findByIdAndDelete(userId);

        if (!deleteProfile) {
            return res.status(404).json({message: 'Not Found'})
        }
       } catch (error) {
        return res.status(500).json({error: 'Ooops!! an error occured, please refresh'})
       }
    }

}

module.exports = userController;

