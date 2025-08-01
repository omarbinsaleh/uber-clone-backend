const userModel = require('../models/userModels.js');

// @name: registerUser
// @path: POST /user/register
// @desc: Create a new user
const registerUser = async (req, res, next) => {

}

// @name: findUsers
// @path: GET /user
// @desc: retrive all the users from the DB;
const findUsers = async (req, res, next) => {
   res.send({user: 'all users has been returned successfully'})
}


// exports user's controllers
module.exports = { registerUser, findUsers };