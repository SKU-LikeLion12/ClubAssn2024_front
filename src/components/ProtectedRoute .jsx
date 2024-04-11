import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('Token');
  const role = localStorage.getItem('role');
  
  if (!token || role !== 'ROLE_ADMIN') {
    return <Navigate to="/admin/adminLogin" />;
  }

  return children;
};

export default ProtectedRoute;