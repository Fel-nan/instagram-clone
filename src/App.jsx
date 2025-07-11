import React, { useEffect }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import CreatePost from './components/CreatePost';
import ProfilePage from './pages/profilePage';
import './App.css';


const App = () => {
  useEffect(() => {
  const applyTheme = (isDark) => {
    console.log('Applying theme:', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  };

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  applyTheme(prefersDark.matches);

  // 👇 Define the listener as a named function
  const handleThemeChange = (e) => {
    applyTheme(e.matches);
  };

  prefersDark.addEventListener('change', handleThemeChange);

  return () => {
    prefersDark.removeEventListener('change', handleThemeChange);
  };
}, []);
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
