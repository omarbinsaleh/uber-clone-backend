// import dependencies
const express = require('express');
const captainControllers = require('../controllers/captainController.js');
const captainMiddleware = require('../middleware/captainMiddleware.js');

// initialize captain router
const captainRouter = express.Router();

// define API for captain
captainRouter.post('/register', captainControllers.registerCaptain);
captainRouter.post('/login', captainControllers.loginCaptain);
captainRouter.get('/profile', captainMiddleware.authCaptain, captainControllers.getCaptainProfile);
captainRouter.get('/logout', captainMiddleware.authCaptain, captainControllers.logoutCaptain);



// exports captain router
module.exports = captainRouter;