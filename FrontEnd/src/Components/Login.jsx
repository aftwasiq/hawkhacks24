import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './LogInPage.css'

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className='login-container'>
      <form onSubmit={onSubmit} className='login-form'>
        <h2>Login/SignUp</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="username" value={username} onChange={onChange} required />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
