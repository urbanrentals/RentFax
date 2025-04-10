import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">Risk Report Admin</div>
      <ul className="nav-links">
        {role === 'admin' && <li><Link to="/">📊 Dashboard</Link></li>}
        {(role === 'user' || role === 'admin') && (
          <li><Link to="/submit-report">📝 Submit Report</Link></li>
        )}
      </ul>
      {role && (
        <button onClick={handleLogout} className="profile-btn">Logout</button>
      )}
    </nav>
  );
};

export default Header;
