// import dependencies
const captainModel = require('../models/captainModel.js');

// @name: createCaptain
// @desc: Crate a new captain in the database
// @auth: Omar Bin Saleh
const createCaptain = async ({ firstName, lastName, email, password, color, plate, capacity, vehicleType }) => {
   // step 1: check if any of the fields is missing
   if (!firstName || !lastName || !email || !password || !color || !plate || !capacity || !vehicleType) {
      throw new Error('All fields are required');
   }
   try {
      // step 2: create the captain
      const captain = await captainModel.create({
         fullName: { firstName, lastName },
         email,
         password,
         vehicle: {
            color,
            plate,
            capacity,
            vehicleType
         }
      });

      // step 3: return the captain
      return captain;

   } catch (error) {
      throw new Error(error.message);
   }
}

// exports the captain services
module.exports = { createCaptain };