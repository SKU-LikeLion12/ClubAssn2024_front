import React, { createContext, useContext, useEffect, useState } from 'react';
import { API } from '../api/API';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
    
  const getAuth = async () => {
    try {
      await API().get('/mypage');
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          navigate('/admin/adminLogin')
        }
      }
    }
  }

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, getAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
