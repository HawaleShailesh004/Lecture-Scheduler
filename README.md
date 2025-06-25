# 📚 Online Lecture Scheduler

A full-stack MERN application that allows administrators to manage instructors, create courses, and assign lectures, while instructors can view their scheduled lectures through a dedicated portal.

---

## 🔧 Tech Stack

- **Frontend**: React, Axios, React Router DOM
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT
- **Styling**: Custom CSS with animations

---

## ✨ Features

### 👨‍🏫 Instructor Portal
- Login with name
- View all assigned lectures with course names and dates

### 🔐 Admin Dashboard
- Admin login with secure credentials
- Add instructors
- Add new courses (with name, level, description, image)
- Assign lectures with automatic date conflict checking

### 🎯 General
- Clean, modern UI with cards & animations
- JWT-based authentication
- Fully responsive layout
- React Router for multi-page SPA experience

---

## 🔑 Admin Login

```bash
Email: admin@lectures.com
Password: admin123
```

```bash
# Clone the repository
git clone https://github.com/your-username/online-lecture-scheduler.git
cd online-lecture-scheduler

# Backend Setup
cd server
npm install
# Replace MongoDB connection string in index.js
npm start

# Frontend Setup
cd ../client
npm install
npm start

```
