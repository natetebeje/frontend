import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import JobList from './components/JobList';
import JobApplication from './components/JobApplication';
import './styles/App.css';  // Import global styles

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Job Application System</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/apply/:jobId" element={<JobApplication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
