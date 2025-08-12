// import necessary dependencies
const { validationResult } = require('express-validator');
const captainModel = require('../models/captainModel.js');
const captainServices = require('../services/captainService.js');
const blacklistTokenModel = require('../models/blacklistTokenModel.js');

// @name: registerCaptain
// @path: POST /captains/register
// @desc: Register a new captain in the system and send response to the front end after that
// @auth: Omar Bin Saleh
const registerCaptain = async (req, res, next) => {
   try {
      // step 1: extract necessary information from the request body
      const { fullName, email, password, vehicle } = req.body;

      // step 2: perfor error validation for all the field comming through the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ success: false, message: 'Invalid inputs', errors: errors.array() });
      }

      // step 3: check if the is any captain in the database with the same email
      const isCaptainExist = await captainModel.findOne({ email });
      if (isCaptainExist) {
         return res.status(400).json({ success: false, message: "Captain already exists with this email" });
      }

      // step 4: hash the password
      const hashedPassword = await captainModel.hashPassword(password);

      // step 5: create captain
      const captain = await captainServices.createCaptain({
         firstName: fullName.firstName,
         lastName: fullName.lastName,
         email,
         password: hashedPassword,
         color: vehicle.color,
         plate: vehicle.plate,
         capacity: vehicle.capacity,
         vehicleType: vehicle.vehicleType
      })

      // step 6: generate token
      const token = await captain.generateAuthToken();

      // step 7: set the token in the cookies
      res.cookie('token', token);

      // step 8: send response to the front end
      res.status(201).json({ 
         captain: {
            _id: captain._id,
            fullName: captain.fullName, 
            email: captain.email, 
            status: captain.status, 
            vehicle: captain.vehicle,
            __v: vehicle.__v
         }, 
         token, 
         success: true, 
         message: 'Captain registered successfully' 
      });

   } catch (error) {
      res.status(402).json({ error, success: false, message: error.message });
   };
};

// @name: loginCaptain
// @path: POST /captains/login
// @desc: Login existing captain
// @auth: Omar Bin Saleh
const loginCaptain = async (req, res, next) => {
   try {
      // step 1: extract necessary data from the request body
      const { email, password } = req.body;

      // step 2: perform error validation for the data comming through the request body
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ success: false, message: 'Invalid Email or Password', errors: errors.array() });
      };

      // step 3: validate captain using email
      const captain = await captainModel.findOne({ email }).select('+password');
      if (!captain) {
         return res.status(400).status({ success: false, message: 'Invalid Email or Password' });
      };

      // step 4: validate captain's password
      const isMatch = await captain.comparePassword(password);
      if (!isMatch) {
         return res.status(400).json({ success: false, message: 'Invalid Email or Password' });
      };

      // step 5: generate authentication token
      const token = captain.generateAuthToken();

      // step 6: set the token in the cookies
      res.cookie('token', token);

      // step 7: send success response to the frontend with captain information and the token
      res.status(200).json({
         captain: {
            _id: captain._id,
            fullName: captain.fullName,
            email: captain.email,
            status: captain.status,
            vehicle: captain.vehicle,
            __v: captain.__v
         },
         token,
         success: true,
         message: 'Captain Login Successful'
      });
   } catch (error) {
      res.status(400).json({ success: false, error, message: error.message, error });
   };
};

// @name: getCaptainProfile
// @path: GET /captains/profile
// @midd: authCaptain > getCaptainProfile
// @desc: Return a captain's profile information
// @auth: Omar Bin Saleh
const getCaptainProfile = async (req, res, next) => {
   res.status(200).json({ captain: req.captain, success: true, message: 'Captain profile is returned successfully' });
};

// @name: logoutCaptain
// @path: GET /captains/logout
// @midd: authCaptain > logoutCaptain
// @desc: Logout a captain from the application
// @auth: Omar Bin Saleh
const logoutCaptain = async (req, res, next) => {
   try {
      // step 1: save the token in DB as a black listed token
      const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
      const blackListedToken = await blacklistTokenModel.create({ token });

      // step 2: clear the token from cookies
      res.clearCookie('token');

      // step 3: send a success response to the frontend
      res.status(200).json({ blackListedToken: blackListedToken.token, success: true, message: 'User logged out successfully' });
   } catch (error) {
      res.status(400).json({ success: false, message: error.message, error });
   }
}

// exports captain controllers
module.exports = { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };