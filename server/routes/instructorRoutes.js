const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

// Get all instructors
router.get('/', async (req, res) => {
  const instructors = await Instructor.find();
  res.json(instructors);
});

// Create instructor (for dummy data)
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newInstructor = new Instructor({ name });
  await newInstructor.save();
  res.status(201).json(newInstructor);
});

module.exports = router;
