import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on initial render
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally verify token here
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
      console.error(err.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
