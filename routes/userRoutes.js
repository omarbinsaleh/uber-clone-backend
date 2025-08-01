const express = require('express')
const userRouter = express.Router();
const userControllers = require('../controllers/userController.js');

// define user api end points
userRouter.post('/register', userControllers.registerUser )
userRouter.get('/', userControllers.findUsers);

// export the user router
module.exports = userRouter;