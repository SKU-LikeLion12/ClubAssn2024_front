import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorBoundary = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleErrors = (error) => {
      if (error.response && error.response.status === 401) {
        navigate('/admin/adminLogin'); 
        localStorage.clear();
      }
    };
    window.addEventListener('error', handleErrors);

    // Clean-up 함수
    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);
};

export default ErrorBoundary;
