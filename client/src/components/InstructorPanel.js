import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InstructorPanel.css';

const InstructorPanel = ({ instructorId }) => {
  const [lectures, setLectures] = useState([]);
  const instructorName = localStorage.getItem('instructorName') || 'Instructor';
  const API = 'http://localhost:5000/api';

  useEffect(() => {
    if (instructorId) {
      fetchLectures(instructorId);
    }
  }, [instructorId]);

  const fetchLectures = async (id) => {
    try {
      const res = await axios.get(`${API}/lectures/instructor/${id}`);
      setLectures(res.data);
    } catch (err) {
      console.error('Failed to fetch lectures:', err);
    }
  };

  return (
    <div className="instructor-container">
      <h1 className="instructor-title">👨‍🏫 Welcome, {instructorName}</h1>
      <p className="instructor-subtitle">Here are your scheduled lectures:</p>

      <div className="instructor-card fade-in">
        {lectures.length > 0 ? (
          <ul className="lecture-list">
            {lectures.map((lec) => (
              <li key={lec._id} className="lecture-item">
                <span>📘 <strong>{lec.course.name}</strong></span>
                <span>🗓️ {lec.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-lectures">No lectures assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorPanel;
