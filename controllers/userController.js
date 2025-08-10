const { validationResult } = require('express-validator');
const userModel = require('../models/userModels.js');
const blacklistTokenModel = require('../models/blacklistTokenModel.js');
const userServices = require('../services/userService.js');

// @name: registerUser
// @path: POST /users/register
// @desc: Create a new user
// @auth: Omar Bin Saleh
const registerUser = async (req, res, next) => {
   try {
      // step 1: extract data from the request body
      const { fullName, email, password } = req.body;

      // step 2: handle firstName, email and password validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ success: false, errors: errors.array() })
      }

      // step 3: check if user exists with the same email
      const isUserExists = await userModel.findOne({ email });
      if (isUserExists) {
         return res.status(400).json({success: false, message: 'User already exists with this email' });
      }

      // step 4: hash the password
      const hashedPassword = await userModel.hashPassword(password);

      // step 5: create a new user 
      const user = await userServices.createUser({
         firstName: fullName.firstName,
         lastName: fullName.lastName,
         email,
         password: hashedPassword
      });

      // step 6: generate token
      const token = user.generateAuthToken();

      // step 7: set the token in the cookies
      res.cookie('token', token);

      // step 8: send a success response to the client
      res.status(201).json({ token, user, success: true, message: 'User registered successfully!' });
   } catch (error) {
      res.status(500).json({ error, success: false, message: error.message });
   }
}

// @name: findUsers
// @path: GET /users
// @desc: retrive all the users from the DB;
// @auth: Omar Bin Saleh
const getAllUsers = async (req, res, next) => {
   try {
      const users = []
      res.send({users, success: true, message: 'all users has been returned successfully' })
      next()
   } catch (error) {
      res.status(500).json({success: false, error, message: error.message })
   }
}

// @name: loginUser
// @path: POST /users/login
// @desc: allow an existing user to login
// @auth: Omar Bin Saleh 
const loginUser = async (req, res, next) => {
   try {
      // step 1: extract data from the request body
      const { email, password } = req.body;

      // step 2: email and password error validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({success: false, message: 'Invalid email or password', errors: errors.array() });
      }

      // step 3: find user in the database with the email
      const user = await userModel.findOne({ email }).select('+password');

      // step 4: check if the user already exists or not
      if (!user) {
         return res.status(401).json({success: false, message: 'Invalid email or password' });
      };

      // step 5: check if the password is matching
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
         return res.status(401).json({ success: false, message: 'Invalid email or password' });
      };

      // step 6: generate the authentication token
      const token = user.generateAuthToken();

      // step 7: set the token in the cookies
      res.cookie('token', token);

      // step 8: send the user and the token to the font end
      res.status(200).json({ user: {_id: user._id, fullName: user.fullName, email: user.email, __v: user.__v}, token, success: true, message: 'User loggedin successfully' });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message, error });
   }
};

// @name: getUserProfile
// @path: GET /users/profile
// @midd: authUser > getUserProfile 
// @desc: return profile information of a logged-in user
// @auth: Omar Bin Saleh
const getUserProfile = async (req, res, next) => {
   res.status(200).json({ user: req.user, success: true, message: 'User profile is returned' });
};

// @name: logoutUser
// @path: GET /users/logout
// @midd: authUser > logoutUser
// @desc: allow user to logout of the system
// @auth: Omar Bin Saleh
const logoutUser = async (req, res, next) => {
   try {
      // step 1: save the token in the database as black listed token
      const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
      const blacklistToken = await blacklistTokenModel({ token });

      // step 2: clear the token from the cookies
      res.clearCookie('token')

      // step 3: send a response to the front end with the black listed token
      res.status(200).json({ success: true, message: 'User logged out successfully', blacklistToken });
   } catch (error) {
      res.status(401).json({ success: false, message: 'Unauthorized access or Something went wrong' })
   }

};


// exports user's controllers
module.exports = { registerUser, getAllUsers, loginUser, getUserProfile, logoutUser };