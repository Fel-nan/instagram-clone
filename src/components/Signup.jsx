import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import LogLayout from './logLayout';


const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    username: '',
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Signing up as ${formData.username}`);
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
            <span role="img" aria-label="facebook">📘</span> Log in with Facebook
          </button>

          <div className="divider">OR</div>

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              placeholder="Mobile Number or Email"
              value={formData.email}
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
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <p className="info-text">
              People who use our service may have uploaded your contact information to Instagram. <a href="#">Learn More</a>
            </p>
            <p className="terms">
              By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
            </p>
            <button type="submit">Sign up</button>
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
