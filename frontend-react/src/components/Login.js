import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Select a Role to Log In</h2>
      <button onClick={() => handleLogin('admin')}>Login as Admin</button>
      <button onClick={() => handleLogin('user')} style={{ marginLeft: '1rem' }}>
        Login as User
      </button>
    </div>
  );
};

export default Login;
