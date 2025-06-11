import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import LogLayout from './logLayout';
import { BsFacebook } from "react-icons/bs";
import axios from '../api/axios';


const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    username: '',
  });
  

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};

 const isStrongPassword = (password) => {
  const weakPasswords = [
    '12345678', '123456789', '00000000', '123456', 'password', 'qwerty',
    '123123', '11111111', 'abc123', 'password1', 'iloveyou'
  ];

  if (weakPasswords.includes(password.toLowerCase())) {
    return false;
  }
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/;
  return regex.test(password);
};

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isStrongPassword(formData.password)) {
    alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
    return;
  }
  setLoading(true);


  try {
    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      full_name: formData.fullName,
    };


    const response = await axios.post('/auth/register/', payload);

    // JWT tokens returned
    const { access, refresh } = response.data;

    // Store tokens in localStorage (or Redux)
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    alert('Signup successful!');
    // Optionally redirect to homepage or dashboard
    // navigate('/home'); if you're using React Router v6
  } catch (error) {
    console.error('Signup error:', error.response?.data);
    const errorMsg =
      error.response?.data?.non_field_errors?.[0] ||
      error.response?.data?.email?.[0] ||
      error.response?.data?.username?.[0] ||
      "Signup failed";
    alert(errorMsg);
  }  finally {
    setLoading(false);
  }
};



  return (
    <LogLayout>
    <div className="signup-wrapper">
      <div className="form-section">
        <div className="form-box">
          <h1 className="logo">Instagram</h1>
          <p className="signup-subtitle">
            Sign up to see photos and videos from your friends.
          </p>

          <button className="facebook-login wide">
            <span className='facebook-logo' role="img" aria-label="facebook" style={{alignItems: 'center', display: 'inline'}}><BsFacebook size={15}/> </span> Log in with Facebook
          </button>

          <div className="divider">OR</div>

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              placeholder="Mobile Number or Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <div style={{ position: 'relative' }}>
              <input
    name="password"
    type={showPassword ? 'text' : 'password'}
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
    disabled={loading}
  />
  <span
    onClick={togglePasswordVisibility}
    style={{
      position: 'absolute',
      right: '30px',
      top: '40%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '12px',
      color: '#888',
    }}
  >
    {showPassword ? 'Hide' : 'Show'}
  </span>
</div>
{!isStrongPassword(formData.password) && formData.password.length > 0 && (
  <p className="error-text" style={{ color: 'red', fontSize: '12px' }}>
    Password must be at least 8 characters.
  </p>
)}

            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <p className="info-text">
              People who use our service may have uploaded your contact information to Instagram. <a href="#">Learn More</a>
            </p> 
            <br/>
            <p className="terms">
              By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
            </p>
            <button type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
  
          </form>
        </div>

        <div className="signup-box">
          <p>
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
    </LogLayout>
  );
};

export default Signup;
