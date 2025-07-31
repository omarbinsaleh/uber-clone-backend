const mongoose = require('mongoose');

const connectToDb = async() => {
   try {
      await mongoose.connect(process.env.DB_LOCAL_URI);
      console.log('Connected to DB successfully!');   
   } catch (error) {
      console.log(error);
   }
};

module.exports = connectToDb;