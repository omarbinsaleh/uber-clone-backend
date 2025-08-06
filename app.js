// import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const serverRoutes = require('./routes/serverRoutes');

// step 1: initialize the express app
const app = express();

// step 2: application level middlewares configuration
app.use(cors());

// step 3: connect to the database
connectToDb()

// step 4: define routes
app.get('/', serverRoutes)
app.use('/user', userRoutes);

// step 5: export the app instance
module.exports = app;