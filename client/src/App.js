import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import AdminPanel from './components/AdminPanel';
import InstructorPanel from './components/InstructorPanel';
import './App.css'; // Add this line

const App = () => {
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [instructorId, setInstructorId] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    const savedInstructorId = localStorage.getItem('instructorId');

    if (savedToken && savedRole) {
      setToken(savedToken);
      setRole(savedRole);
      if (savedRole === 'instructor') setInstructorId(savedInstructorId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole('');
    setToken('');
    setInstructorId('');
    window.location.href = '/login';
  };

  const location = useLocation();
  const showLogout = ['/admin', '/instructor'].includes(location.pathname);

  return (
    <div className="app-container">
      {/* Top bar with Logout */}
      {showLogout && (
        <div className="logout-bar">
          <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={
          <LoginPage
            setRole={setRole}
            setToken={setToken}
            setInstructorId={setInstructorId}
          />
        } />

        <Route path="/admin" element={
          role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />
        } />

        <Route path="/instructor" element={
          role === 'instructor' ? <InstructorPanel instructorId={instructorId} /> : <Navigate to="/login" />
        } />

        <Route path="*" element={<p className="not-found">404 - Page Not Found</p>} />
      </Routes>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
