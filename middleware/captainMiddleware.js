const jwt = require('jsonwebtoken');
const captainModel = require('../models/captainModel.js');
const blacklistTokenModel = require('../models/blacklistTokenModel.js');

// @name: authCaptain
// @desc: A middleware function to authenticate a captain by using the token validation
// @auth: Omar Bin Saleh
const authCaptain = async (req, res, next) => {
   // step 1: check if the token is found or not
   const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
   if (!token) {
      return res.status(401).json({message: 'Unauthorized access'});
   }

   try {
      // step 2: check if the token is black listed or not
      const isBlackListed = await blacklistTokenModel.findOne({token});
      if (isBlackListed) {
         return res.status(401).json({message: 'Unauthorized access'});
      } 

      // step 3: verify the token and validate the captain
      const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
      const captain = await captainModel.findOne({_id: decodedObj._id});
      if (!captain) {
         return res.status(401).json({message: 'Unauthorized access'});
      }

      // step 4: add the captain information in the request object
      req.captain = captain;
      return next();

   } catch (error) {
      return res.status(401).json({message: 'Unauthorized access', error});
   }
}

// export the middleware
module.exports = {authCaptain};