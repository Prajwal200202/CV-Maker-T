const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  institution: String,
  degree: String,
  fieldOfStudy: String,
  grade: Number,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model('Education', EducationSchema);