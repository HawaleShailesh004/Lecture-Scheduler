const mongoose = require('mongoose');
const Instructor = require('./models/Instructor');
const Course = require('./models/Course');
const Lecture = require('./models/Lecture');

const mongoURI = 'mongodb+srv://shaileshhawale004:riST9246hStmkhEe@lectureschedulercluster.s0ugxo9.mongodb.net/?retryWrites=true&w=majority&appName=LectureSchedulerCluster'; // Your URI here

async function seedData() {
  await mongoose.connect(mongoURI);

  await Instructor.deleteMany();
  await Course.deleteMany();
  await Lecture.deleteMany();

  const instructors = await Instructor.insertMany([
    { name: 'Rahul Sharma' },
    { name: 'Priya Mehta' },
    { name: 'Amit Joshi' },
    { name: 'Sneha Gupta' }
  ]);

  const courses = await Course.insertMany([
    {
      name: 'Java Basics',
      level: 'Beginner',
      description: 'Intro to Java',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'MongoDB',
      level: 'Intermediate',
      description: 'NoSQL Databases',
      image: 'https://via.placeholder.com/150'
    }
  ]);

  await Lecture.create({
    course: courses[0]._id,
    instructor: instructors[0]._id,
    date: '2025-06-26'
  });

  console.log('✅ Dummy data inserted.');
  process.exit();
}

seedData();
