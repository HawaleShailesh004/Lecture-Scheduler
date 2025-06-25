const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const Instructor = require('../models/Instructor');

// Assign a lecture (with date conflict check)
router.post('/', async (req, res) => {
  const { courseId, instructorId, date } = req.body;

  // Check if instructor is already assigned on this date
  const existing = await Lecture.findOne({ instructor: instructorId, date });
  if (existing) {
    return res.status(400).json({ error: 'Instructor already has a lecture on this date' });
  }

  const lecture = new Lecture({ course: courseId, instructor: instructorId, date });
  await lecture.save();
  res.status(201).json(lecture);
});

// Get lectures by instructor
router.get('/instructor/:id', async (req, res) => {
  const lectures = await Lecture.find({ instructor: req.params.id })
    .populate('course', 'name') // Only get course name
    .sort({ date: 1 });
  res.json(lectures);
});

module.exports = router;
