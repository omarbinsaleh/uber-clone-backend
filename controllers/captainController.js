// import necessary dependencies
const { validationResult } = require('express-validator');
const captainModel = require('../models/captainModel.js');
const captainService = require('../services/captainService.js');

// @name: registerCaptain
// @path: POST /captains/register
// @desc: Register a new captain in the system and send response to the front end after that
// @auth: Omar Bin Saleh
const registerCaptain = async (req, res, next) => {
   try {
      // step 1: extract necessary information from the request body
      const { fullName, email, password, vehicle } = request.body;

      // step 2: perfor error validation for all the field comming through the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      // step 3: check if the is any captain in the database with the same email
      const isCaptainExist = await captainModel.findOne({ email });
      if (isCaptainExist) {
         return res.status(400).json({ message: "Captain already exists with this email" });
      }

      // step 4: hash the password
      const hashedPassword = await captainModel.hashPassword(password);

      // step 5: create captain
      const captain = await captainService.createCaptain({
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
      res.status(201).json({ captain, token });

   } catch (error) {
      res.status(402).json({ error, message: error.message });
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
         return res.status(400).json({ errors: errors.array() });
      };

      // step 3: validate captain using email
      const captain = await captainModel.findOne({ email }).select('+password');
      if (!captain) {
         return res.status(400).status({ message: 'Invalid Email or Password' });
      };

      // step 4: validate captain's password
      const isMatch = await captain.comparePassword(password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid Email or Password' });
      };

      // step 5: generate authentication token
      const token = captain.generateAuthToken();

      // step 6: set the token in the cookies
      res.cookie('token', token);

      // step 7: send success response to the frontend with captain information and the token
      res.status(200).json({ captain, token });
   } catch (error) {
      res.status(400).json({ message: error.message, error });
   }
}

// exports captain controllers
module.exports = { registerCaptain, loginCaptain };