const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// define user schema
const userSchema = new mongoose.Schema({
   fullName: {
      firstName: {
         type: String,
         required: true,
         minlength:[3, 'First name must be at least 3 characters long']
      },
      lastName: {
         type: String,
         minlength: [3, 'Last name must be at least 3 characters long']
      }
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: [5, 'Email must be at least 5 characters long']
   },
   password: {
      type: String,
      required: true,
      select: false
   },
   socketId: {
      type: String
   }
});

// add methods to the userSchema
userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
   return token;
};

userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password)
};

userSchema.statics.hashPassword = async (password) => {
   return await bcrypt.hash(password, 10);
};

// create user model
const userModel = mongoose.model('User', userSchema);

// export the user model
module.exports = userModel;