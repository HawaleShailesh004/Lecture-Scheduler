const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add a new course
router.post('/', async (req, res) => {
  const { name, level, description, image } = req.body;
  const newCourse = new Course({ name, level, description, image });
  await newCourse.save();
  res.status(201).json(newCourse);
});

module.exports = router;
