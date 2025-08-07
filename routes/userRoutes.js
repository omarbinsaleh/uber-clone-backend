const express = require('express')
const userRouter = express.Router();
const userControllers = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const { body } = require('express-validator')

// define user specific api end points
userRouter.get('/', userControllers.getAllUsers);
userRouter.post(
   '/register',
   [
      body('email').isEmail().withMessage('Invalid Email'),
      body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
   ],
   userControllers.registerUser
);

userRouter.post(
   '/login',
   [
      body('email').isEmail().withMessage('Invalid Email'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
   ],
   userControllers.loginUser
)

userRouter.get(
   '/profile',
   authMiddleware.authUser,
   userControllers.getUserProfile
)

userRouter.get(
   '/logout',
   authMiddleware.authUser,
   userControllers.logoutUser
);

// export the user router
module.exports = userRouter;