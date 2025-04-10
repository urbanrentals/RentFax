// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ReportSubmissionForm from './components/ReportSubmissionForm';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login'; // Add this if you have a login page
import { AuthProvider } from './context/AuthContext';
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login page route */}
          <Route path="/login" element={<Login />} />

          {/* Admin dashboard route */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* User-facing report form */}
          <Route
            path="/submit-report"
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <ReportSubmissionForm />
              </ProtectedRoute>
            }
          />

          {/* Public Stripe payment result pages */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />

          {/* Fallback route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
