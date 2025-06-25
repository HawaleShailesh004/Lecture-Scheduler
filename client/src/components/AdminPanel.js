import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newInstructor, setNewInstructor] = useState('');
  const [courseForm, setCourseForm] = useState({ name: '', level: '', description: '', image: '' });
  const [lectureForm, setLectureForm] = useState({ courseId: '', instructorId: '', date: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const API = 'https://lecture-scheduler-backend-service.onrender.com/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const instructorRes = await axios.get(`${API}/instructors`);
      const courseRes = await axios.get(`${API}/courses`);
      setInstructors(instructorRes.data);
      setCourses(courseRes.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load initial data.' });
    }
  };

  const handleAddInstructor = async () => {
    try {
      await axios.post(`${API}/instructors`, { name: newInstructor });
      setNewInstructor('');
      fetchData();
      setMessage({ type: 'success', text: '✅ Instructor added successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Failed to add instructor.' });
    }
  };

  const handleCourseSubmit = async () => {
    try {
      await axios.post(`${API}/courses`, courseForm);
      setCourseForm({ name: '', level: '', description: '', image: '' });
      fetchData();
      setMessage({ type: 'success', text: '✅ Course added successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Failed to add course.' });
    }
  };

  const handleLectureAssign = async () => {
    try {
      await axios.post(`${API}/lectures`, lectureForm);
      setLectureForm({ courseId: '', instructorId: '', date: '' });
      setMessage({ type: 'success', text: '✅ Lecture assigned successfully!' });
    } catch (err) {
      const errorMsg = err?.response?.data?.error || '❌ Failed to assign lecture.';
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">🎓 Admin Dashboard</h1>
      <p className="admin-subtitle">Manage instructors, courses, and schedule lectures.</p>

      <div className="admin-card-container">
        {/* Add Instructor */}
        <div className="admin-card fade-in">
          <h2>👤 Add Instructor</h2>
          <input
            type="text"
            placeholder="Instructor Name"
            value={newInstructor}
            onChange={(e) => setNewInstructor(e.target.value)}
          />
          <button onClick={handleAddInstructor}>Add Instructor</button>
        </div>

        {/* Add Course */}
        <div className="admin-card fade-in delay">
          <h2>📘 Add Course</h2>
          <input
            placeholder="Course Name"
            value={courseForm.name}
            onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
          />
          <input
            placeholder="Level (Beginner / Advanced)"
            value={courseForm.level}
            onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
          />
          <input
            placeholder="Short Description"
            value={courseForm.description}
            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
          />
          <input
            placeholder="Course Image URL"
            value={courseForm.image}
            onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
          />
          <button onClick={handleCourseSubmit}>Add Course</button>
        </div>

        {/* Assign Lecture */}
        <div className="admin-card fade-in delay-more">
          <h2>📅 Assign Lecture</h2>
          <select
            value={lectureForm.courseId}
            onChange={(e) => setLectureForm({ ...lectureForm, courseId: e.target.value })}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <select
            value={lectureForm.instructorId}
            onChange={(e) => setLectureForm({ ...lectureForm, instructorId: e.target.value })}
          >
            <option value="">Select Instructor</option>
            {instructors.map((i) => (
              <option key={i._id} value={i._id}>{i.name}</option>
            ))}
          </select>

          <input
            type="date"
            value={lectureForm.date}
            onChange={(e) => setLectureForm({ ...lectureForm, date: e.target.value })}
          />
          <button onClick={handleLectureAssign}>Assign Lecture</button>
        </div>
      </div>

      {message.text && (
        <p className={`admin-message ${message.type}`}>{message.text}</p>
      )}
    </div>
  );
};

export default AdminPanel;
