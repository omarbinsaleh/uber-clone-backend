const userModel = require('../models/userModels.js');

const createUser = async ({firstName, lastName, email, password}) => {

   // step 1: make sure all the fields are provided
   if (!firstName || !lastName || !email || !password) {
      throw new Error('All fields are required');
   }

   // step 2: create new user
   const user = await userModel.create({
      fullName: {
         firstName,
         lastName
      },
      email,
      password
   });

   // return the new user
   return user;
}


// exports user services
module.exports = { createUser };