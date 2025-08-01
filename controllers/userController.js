const userModel = require('../models/userModels.js');
const userServices = require('../services/userService.js');

// @name: registerUser
// @path: POST /user/register
// @desc: Create a new user
const registerUser = async (req, res, next) => {

}

// @name: findUsers
// @path: GET /user
// @desc: retrive all the users from the DB;
const findUsers = async (req, res, next) => {
   try {
      res.send({user: 'all users has been returned successfully'})
      next()
   } catch (error) {
      res.status(500).json({message: error.message})
   }
}


// exports user's controllers
module.exports = { registerUser, findUsers };