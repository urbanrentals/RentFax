// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar">
    <div className="logo">Risk Report Admin</div>
    <ul className="nav-links">
      <li><Link to="/">📊 Dashboard</Link></li>
      <li><Link to="/submit-report">📝 Submit Report</Link></li>
      <li><Link to="/admin/settings">⚙️ Settings</Link></li>
    </ul>
    <button className="profile-btn">Logout</button>
  </nav>
);

export default Header;
