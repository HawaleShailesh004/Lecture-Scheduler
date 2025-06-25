const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
  date: { type: String, required: true }  // Use ISO string (e.g., "2024-07-01")
});

module.exports = mongoose.model('Lecture', lectureSchema);
