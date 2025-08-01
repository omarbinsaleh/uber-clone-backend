const express = require('express');
const serverRouter = express.Router();
const serverController = require('../controllers/serverController.js');

// step 1: define sever specific routes
serverRouter.get('/', serverController.greetPeople);

// step 2: exports the server router
module.exports = serverRouter;