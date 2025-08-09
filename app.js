// import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/userRoutes.js');
const serverRoutes = require('./routes/serverRoutes.js');
const captainRoutes = require('./routes/captainRoutes.js')
const clientErrorRoutes = require('./routes/clientErrorRoutes.js');

// step 1: initialize the express app
const app = express();

// step 2: application level middlewares configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// step 3: connect to the database
connectToDb()

// step 4: define routes
app.use('/', serverRoutes)
app.use('/users', userRoutes);
app.use('/captains', captainRoutes); //  <--- captain routes configuration
app.use(clientErrorRoutes) // <--- handle client error

// step 5: export the app instance
module.exports = app;