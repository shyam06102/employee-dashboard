import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('auth-token', 'mock-token');
      setIsLoggedIn(true);
      navigate('/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};