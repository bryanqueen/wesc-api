const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Wesc-Api/routes/userRoutes');
const commentRoutes = require('../Wesc-Api/routes/commentRoutes');
const blogRoutes = require('../Wesc-Api/routes/blogRoutes');
const programmeRoutes = require('../Wesc-Api/routes/programmeRoutes')
require('dotenv').config();
const path = '/api/v1/'

//Initialize app
const app = express();

//Establish Mongoose Connection
mongoose.connect()


//Json Parser Middleware
app.use(express.json());

//Routes Middleware
app.use(`${path}users`, userRoutes);
app.use(`${path}blogs`, blogRoutes);
app.use(`${path}comments`, commentRoutes);
app.use(`${path}programmes`, programmeRoutes);




const port = 4000;

app.listen(port, ()=>{
    console.log(`Server is running on localhost:${port}`)
})