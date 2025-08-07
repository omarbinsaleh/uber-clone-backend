// import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/userRoutes.js');
const serverRoutes = require('./routes/serverRoutes.js');
const captainRoutes = require('./routes/captainRoutes.js')

// step 1: initialize the express app
const app = express();

// step 2: application level middlewares configuration
app.use(cors());

// step 3: connect to the database
connectToDb()

// step 4: define routes
app.use('/', serverRoutes)
app.use('/user', userRoutes);
app.use('/captain', captainRoutes); //  <--- captain routes configuration

// step 5: export the app instance
module.exports = app;