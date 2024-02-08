const express = require('express');
const mongoose = require('mongoose');
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

//Import all the Models
// require('./models/Blog');
// require('/models/Comment');
// require('/models/JobsBanner');
// require('./models/Programme');
// require('./models/User');


//Json Parser Middleware
app.use(express.json());

//Routes Middleware
app.use(`${path}users`, userRoutes);
app.use(`${path}blogs`, blogRoutes);
app.use(`${path}comments`, commentRoutes);
app.use(`${path}programmes`, programmeRoutes);
app.use(`${path}jobs`, jobsbannerRoutes)
app.get('/',(req, res) => {
    res.send('<h1>WESC Backend Api</h1>')
})




const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on localhost:${port}`)
})