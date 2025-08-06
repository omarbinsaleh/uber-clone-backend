// import dependencies
const mongoose = require('mongoose');

// define schema for blacklist token
const blacklistTokenSchmea = new mongoose.Schema({
   token: {
      type: String,
      required: true,
      unique: true
   },
   createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400 // 24 hours in second
   }
})

// create a model for the blacklist token
const blacklistTokenModel = mongoose.model('BlacklistTokens', blacklistTokenSchmea);

// exports the blacklistTokenModel
module.exports = blacklistTokenModel;