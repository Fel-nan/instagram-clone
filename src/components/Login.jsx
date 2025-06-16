import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import mockup from '../assets/Instapic.png'; // 
import LogLayout from './logLayout';
import { BsFacebook } from "react-icons/bs";
import axios from '../api/axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      username: formData.username,
      password: formData.password,
    };

    const response = await axios.post('/auth/login/', payload);

    // Save tokens to localStorage
    const { access, refresh } = response.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    alert('Login successful!');
    // navigate('/home'); // If you're using react-router
    navigate('/home');
  } catch (error) {
    console.error('Login error:', error.response?.data);
    const errorMsg =
      error.response?.data?.detail ||
      "Login failed. Check your credentials.";
    alert(errorMsg);
  }
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
              placeholder="username"
              disabled={loading}
              value={formData.username}
              onChange={handleChange}
              required
            />
            <div style={{ position: 'relative' }}>
              <input
    name="password"
    type={showPassword ? 'text' : 'password'}
    placeholder="Password"
    disabled={loading}
    value={formData.password}
    onChange={handleChange}
    required
    minLength={8}
  />
  <span
    onClick={togglePasswordVisibility}
    style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '12px',
      color: '#888',
    }}
  >
    {showPassword ? 'Hide' : 'Show'}
  </span>
</div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>  
          </form>

          <div className="divider">OR</div>

          <button className="facebook-login">
            <span className='facebook-logo' role="img" aria-label="facebook"><BsFacebook size={15}/> </span> Log in with Facebook
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

