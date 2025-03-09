const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: {
    type:String,
    unique: true
  },
  phone: String,
  summary: String
});

module.exports = mongoose.model('Profile', ProfileSchema);