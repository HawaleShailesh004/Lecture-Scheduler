const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const instructorRoutes = require('./routes/instructorRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'https://lecture-scheduler.vercel.app', // replace with actual Vercel frontend URL
}));
app.use(express.json());

// API Routes
app.use('/api/instructors', instructorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://shaileshhawale004:riST9246hStmkhEe@lectureschedulercluster.s0ugxo9.mongodb.net/?retryWrites=true&w=majority&appName=LectureSchedulerCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB'); })
.catch(err => console.error('❌ MongoDB connection error:', err));

 app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));

