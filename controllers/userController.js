const { validationResult } = require('express-validator');
const userModel = require('../models/userModels.js');
const userServices = require('../services/userService.js');

// @name: registerUser
// @path: POST /user/register
// @desc: Create a new user
const registerUser = async (req, res, next) => {
   try {
      // step 1: extract data from the request body
      const { fullName, email, password } = req.body;

      // step 2: handle firstName, email and password validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      // step 3: hash the password
      const hashedPassword = await userModel.hashedPassword(password);

      // step 4: create a new user 
      const user = await userServices.createUser({
         firstName: fullName.firstName,
         lastName: fullName.lastName,
         email,
         password: hashedPassword
      });

      // step 5: generate token
      const token = user.generateAuthToken();

      // step 6: send a success response to the client
      res.status(201).json({ token, user });
   } catch (error) {
      res.status(500).json({ error, message: error.message });
   }
}

// @name: findUsers
// @path: GET /user
// @desc: retrive all the users from the DB;
const findUsers = async (req, res, next) => {
   try {
      res.send({ user: 'all users has been returned successfully' })
      next()
   } catch (error) {
      res.status(500).json({ message: error.message })
   }
}

// @name: loginUser
// @path: POST /user/login
// @desc: allow an existing user to login 
const loginUser = async (req, res, next) => {
   // step 1: extract data from the request body
   const { email, password } = req.body;

   // step 2: email and password error validation
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   // step 3: find user in the database with the email
   const user = await userModel.findOne({ email }).select('+password');

   // step 4: check if the user already exists or not
   if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
   };

   // step 5: check if the password is matching
   const isMatch = await user.comparePassword(password);
   if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
   };

   // step 6: generate the authentication token
   const token = await user.generateToken();

   // step 7: send the user and the token to the font end
   res.status(200).json({ user, token, message: 'User loggedin successfully' });
};


// exports user's controllers
module.exports = { registerUser, findUsers, loginUser };