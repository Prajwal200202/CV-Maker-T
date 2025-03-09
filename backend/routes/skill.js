const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new skill
router.post('/', async (req, res) => {
  const skill = new Skill(req.body);
  try {
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a skill
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(skill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;