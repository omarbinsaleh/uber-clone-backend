require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db');

// initialize the express app
const app = express();

// application level middlewares configuration
app.use(cors());

// connect to the database
connectToDb()

// routes
app.get('/', async (req, res) => {
   console.log('Hello world')
   res.send("Hello world!")
})

// export the app instance
module.exports = app;