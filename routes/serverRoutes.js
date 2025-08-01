const express = require('express');
const serverRouter = express.Router();
const serverController = require('../controllers/serverController.js');

serverRouter.get('/', serverController.greetPeople);

// exports the server router
module.exports = serverRouter;