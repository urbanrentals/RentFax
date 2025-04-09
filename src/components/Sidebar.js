import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive(path)
        ? 'bg-blue-100 text-blue-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <aside className="bg-white shadow-md h-screen w-64 p-6 hidden md:block">
      <ul className="space-y-3">
        <li>
          <Link to="/" className={linkClass('/')}>
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/submit-report" className={linkClass('/submit-report')}>
            📝 Submit Report
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className={linkClass('/admin/users')}>
            👤 Users
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className={linkClass('/admin/settings')}>
            ⚙️ Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
