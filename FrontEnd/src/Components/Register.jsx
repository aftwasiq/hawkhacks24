import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./LogInPage.css";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', formData);
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
      <h2>Sign Up</h2>
      <label htmlFor="email">Email:</label>
        <input type="text" name="username" value={username} onChange={onChange} required />
        <label htmlFor="password">Set Password:</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
