const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken')

// @name: authUser
// @desc: A middleware function to authenticate a user by using the token validation
// @auth: Omar Bin Saleh
const authUser = async (req, res, next) => {
   // step 1: check if the token is found or not
   const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
   if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
   };

   try {
      // step 2: decode the token
      const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

      // step 3: check if the user is found or not
      const user = await userModel.findOne({ _id: decodedObj._id });
      if (!user) {
         return res.status(401).json({ message: 'Unauthorized access' });
      };

      // step 4: add the user information in the request object
      req.user = user;
      return next();

   } catch (error) {
      return res.status(401).json({ message: 'Unauthorized access' });
   }

};


// exports all auth middleware
module.exports = { authUser };