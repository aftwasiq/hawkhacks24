import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ username: localStorage.getItem('username') });
    }
  }, []);

  const login = async (formData) => {
    try {
      const res = await axios.post('/api/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', formData.username);
      setUser({ username: formData.username });
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data) {
        console.error(err.response.data);
      } else {
        console.error('Error', err.message);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
