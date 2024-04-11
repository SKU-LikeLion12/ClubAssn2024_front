import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('Token');

  if (!token) {
    return <Navigate to="/admin/adminLogin" />;
  }

  return children;
};

export default ProtectedRoute;