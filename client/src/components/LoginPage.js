// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setRole, setToken, setInstructorId }) => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API = 'https://lecture-scheduler-backend-service.onrender.com/api/auth';

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(`${API}/admin`, {
        email: adminEmail,
        password: adminPassword,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setToken(res.data.token);
      setRole('admin');
      navigate('/admin');
    } catch (err) {
      setError('❌ Invalid admin credentials');
    }
  };

  const handleInstructorLogin = async () => {
    try {
      const res = await axios.post(`${API}/instructor`, {
        name: instructorName,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('instructorId', res.data.instructorId);
      localStorage.setItem('instructorName', res.data.name);
      setToken(res.data.token);
      setRole('instructor');
      setInstructorId(res.data.instructorId);
      navigate('/instructor');
    } catch (err) {
      setError('❌ Instructor not found');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">📚 Online Lecture Scheduler</h1>
      <p className="login-subtitle">Manage and view lectures through dedicated portals.</p>

      <div className="login-card-container">
        <div className="login-card fade-in">
          <h2>🔐 Admin Login</h2>
          <input
            type="email"
            placeholder="Enter admin email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter admin password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <button onClick={handleAdminLogin}>Login as Admin</button>
        </div>

        <div className="login-card fade-in delay">
          <h2>👨‍🏫 Instructor Login</h2>
          <input
            placeholder="Enter your name"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
          />
          <button onClick={handleInstructorLogin}>Login as Instructor</button>
        </div>
      </div>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default LoginPage;
