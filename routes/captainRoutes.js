// import dependencies
const express = require('express');
const captainControllers = require('../controllers/captainController.js');
const captainMiddleware = require('../middleware/captainMiddleware.js');
const { body } = require('express-validator');

// initialize captain router
const captainRouter = express.Router();

// define API for captain
captainRouter.post(
   '/register',
   [
      body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
      body('fullName.lastName').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
      body('email').isEmail().withMessage('Invalid Email'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
      body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
      body('vehicle.capacity').isIn({ min: 1 }).withMessage('Capacity must be at least 1'),
      body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
   ],
   captainControllers.registerCaptain
);

captainRouter.post(
   '/login',
   [
      body('email').isEmail().withMessage('Invalid Email'),
      body('password').isLength({min: 6}).withMessage('Invalid Password')
   ],
   captainControllers.loginCaptain
);
captainRouter.get(
   '/profile',
   captainMiddleware.authCaptain,
   captainControllers.getCaptainProfile
);
captainRouter.get(
   '/logout',
   captainMiddleware.authCaptain,
   captainControllers.logoutCaptain
);



// exports captain router
module.exports = captainRouter;