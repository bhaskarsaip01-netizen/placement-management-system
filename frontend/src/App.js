import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Students from './pages/Students';
import Recruiters from './pages/Recruiters';
import Placements from './pages/Placements';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-title">Placement Management System</h1>
            <div className="nav-links">
              <Link to="/">Students</Link>
              <Link to="/recruiters">Recruiters</Link>
              <Link to="/placements">Placements</Link>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Students />} />
            <Route path="/recruiters" element={<Recruiters />} />
            <Route path="/placements" element={<Placements />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;