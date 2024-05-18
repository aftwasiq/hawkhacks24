import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './LogInPage.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  useEffect(() => {
    const sendDummyData = async () => {
      try {
        const response = await axios.post('/api/dummy', { data: 'example' });
        console.log('Dummy data response:', response.data);
      } catch (error) {
        console.error('Error sending dummy data:', error);
      }
    };

    sendDummyData();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <h2>Login/SignUp</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="text" name="username" value={username} onChange={onChange} required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
