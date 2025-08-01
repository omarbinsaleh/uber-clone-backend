require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const serverRoutes = require('./routes/serverRoutes');

// initialize the express app
const app = express();

// application level middlewares configuration
app.use(cors());

// connect to the database
connectToDb()

// routes
app.get('/', serverRoutes)
app.use('/user', userRoutes);

// export the app instance
module.exports = app;