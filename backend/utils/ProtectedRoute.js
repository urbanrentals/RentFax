import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, role }) => {
  return allowedRoles.includes(role)
    ? children
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;
