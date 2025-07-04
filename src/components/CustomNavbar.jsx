// CustomNavbar.jsx
import React, { useState } from 'react';
import './CustomNavbar.css';
import { FaBars, FaUserCircle } from 'react-icons/fa';

const CustomNavbar = ({ toggleSidebar, onLogin, loggedInUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
    setShowForm(false);
  };

  const handleLoginClick = () => {
    setIsSignup(false);
    setShowForm(true);
    setDropdownVisible(false);
  };

  const handleSignupClick = () => {
    setIsSignup(true);
    setShowForm(true);
    setDropdownVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      if (typeof onLogin === 'function') {
        onLogin(username); // ✅ CORRECT FUNCTION CALL
      } else {
        console.error('onLogin is not a function');
      }

      alert(`${isSignup ? 'Signup' : 'Login'} successful`);
      setShowForm(false);
      setUsername('');
      setPassword('');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="navbar">
      <div className="left-section">
        <FaBars className="hamburger" onClick={toggleSidebar} />
      </div>

      <div className="center-section">
        <h1 className="navbar-title">Employee Portal</h1>
      </div>

      <div className="right-section">
        <div className="user-section" onClick={toggleDropdown}>
          <FaUserCircle className="user-icon" />
          <span>{loggedInUser ? loggedInUser : 'UserAdmin'}</span>
        </div>

        {dropdownVisible && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleLoginClick}>Login</div>
            <div className="dropdown-item" onClick={handleSignupClick}>Signup</div>
          </div>
        )}

        {showForm && (
          <form className="auth-form" onSubmit={handleSubmit}>
            <h3>{isSignup ? 'Signup' : 'Login'}</h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
            <button type="button" className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomNavbar;
