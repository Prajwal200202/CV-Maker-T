const express = require('express');
const router = express.Router();
const Education = require('../models/Education');

// Get all education entries
router.get('/', async (req, res) => {
  try {
    const education = await Education.find();
    res.status(200).json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new education entry
router.post('/', async (req, res) => {
  const education = new Education(req.body);
  try {
    await education.save();
    res.status(200).json(education);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an education entry
router.put('/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(education);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an education entry
router.delete('/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Education deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;