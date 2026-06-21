const express = require('express');
const router = express.Router();
const Placement = require('../models/Placement');

// Get all placements
router.get('/', async (req, res) => {
  try {
    const placements = await Placement.find().populate('student').populate('recruiter');
    res.json(placements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single placement
router.get('/:id', async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id).populate('student').populate('recruiter');
    if (!placement) return res.status(404).json({ message: 'Placement not found' });
    res.json(placement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create placement
router.post('/', async (req, res) => {
  const placement = new Placement(req.body);
  try {
    const newPlacement = await placement.save();
    res.status(201).json(newPlacement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update placement
router.put('/:id', async (req, res) => {
  try {
    const placement = await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!placement) return res.status(404).json({ message: 'Placement not found' });
    res.json(placement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete placement
router.delete('/:id', async (req, res) => {
  try {
    const placement = await Placement.findByIdAndDelete(req.params.id);
    if (!placement) return res.status(404).json({ message: 'Placement not found' });
    res.json({ message: 'Placement deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;