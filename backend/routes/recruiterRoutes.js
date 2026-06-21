const express = require('express');
const router = express.Router();
const Recruiter = require('../models/Recruiter');

// Get all recruiters
router.get('/', async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single recruiter
router.get('/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) return res.status(404).json({ message: 'Recruiter not found' });
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create recruiter
router.post('/', async (req, res) => {
  const recruiter = new Recruiter(req.body);
  try {
    const newRecruiter = await recruiter.save();
    res.status(201).json(newRecruiter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update recruiter
router.put('/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recruiter) return res.status(404).json({ message: 'Recruiter not found' });
    res.json(recruiter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete recruiter
router.delete('/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!recruiter) return res.status(404).json({ message: 'Recruiter not found' });
    res.json({ message: 'Recruiter deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;