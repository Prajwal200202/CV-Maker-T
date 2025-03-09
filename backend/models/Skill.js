const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  name: String,
  proficiency: String ,
});

module.exports = mongoose.model('Skill', SkillSchema);