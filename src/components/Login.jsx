import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import mockup from '../assets/Instapic.png'; // 
import LogLayout from './logLayout';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Logging in ${formData.username}`);
  };

  return (
    <LogLayout>
    <div className="login-wrapper">
      <div className="mockup-section">
        <img src={mockup} alt="Instagram preview" />
      </div>

      <div className="form-section">
        <div className="form-box">
          <h1 className="logo">Instagram</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              placeholder="Phone number, username, or email"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Log In</button>
          </form>

          <div className="divider">OR</div>

          <button className="facebook-login">
            <span role="img" aria-label="facebook">📘</span> Log in with Facebook
          </button>
          <a href="#" className="forgot">Forgot password?</a>
        </div>

        <div className="signup-box">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
     </LogLayout>
  );
};

export default Login;

