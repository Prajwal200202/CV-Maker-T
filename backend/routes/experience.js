const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const experience = new Experience(req.body);
  try {
  await experience.save();
    res.status(201).json(experience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(experience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;