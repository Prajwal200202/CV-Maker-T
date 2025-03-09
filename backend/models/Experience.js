const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  description: String
});

module.exports = mongoose.model('Experience', ExperienceSchema);