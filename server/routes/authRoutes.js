const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Instructor = require('../models/Instructor');

const JWT_SECRET = 'skd93j@#sdf!3^9sdf!sdf123'; // Use .env in prod

// Admin login (static credentials)
router.post('/admin', (req, res) => {
  const { email, password } = req.body;
  if (email === '123@.com' && password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET);
    return res.json({ token, role: 'admin' });
  }
  return res.status(401).json({ error: 'Invalid admin credentials' });
});

// Instructor login (by name)
router.post('/instructor', async (req, res) => {
  const { name } = req.body;
  const instructor = await Instructor.findOne({ name });
  if (!instructor) return res.status(404).json({ error: 'Instructor not found' });

  const token = jwt.sign({ role: 'instructor', id: instructor._id }, JWT_SECRET);
  return res.json({ token, role: 'instructor', instructorId: instructor._id, name: instructor.name });
});

module.exports = router;
