const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2
const userRoutes = require('../Wesc-Api/routes/userRoutes');
const commentRoutes = require('../Wesc-Api/routes/commentRoutes');
const blogRoutes = require('../Wesc-Api/routes/blogRoutes');
const programmeRoutes = require('../Wesc-Api/routes/programmeRoutes');
const jobsbannerRoutes = require('../wesc-api/routes/jobsbannerRoutes')
require('dotenv').config();
const path = '/api/v1/'

//Initialize app
const app = express();

//Establish Mongoose Connection
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Mongoose connection has been established'))
.catch((error) => console.log(error));



//Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//Json Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/',(req, res) => {
    res.status(200).json('Welcome to WESC Backend API');
})
//Routes Middleware
app.use(`${path}users`, userRoutes);
app.use(`${path}blogs`, blogRoutes);
app.use(`${path}comments`, commentRoutes);
app.use(`${path}programmes`, programmeRoutes);
app.use(`${path}jobs`, jobsbannerRoutes)




const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on localhost:${port}`)
})