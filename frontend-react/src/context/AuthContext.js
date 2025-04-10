// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Auth provider wrapper
export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);
  }, []);

  // Login = set role & save it
  const login = (newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  // Logout = clear role & localStorage
  const logout = () => {
    setRole(null);
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);
