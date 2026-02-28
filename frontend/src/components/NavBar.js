import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate('/')}>
        <div className="brand-icon"></div>
        <span className="brand-text">nerd<span className="brand-accent">type</span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); setMenuOpen(false); }}>home</a></li>
        <li><a href="/leaderboard" onClick={(e) => { e.preventDefault(); setMenuOpen(false); }}>leaderboard</a></li>
        <li><a href="https://risshi.is-a.dev" target="_blank" rel="noopener noreferrer">about</a></li>
      </ul>

      <div className="nav-auth">
        <button className="auth-btn login">login</button>
        <button className="auth-btn signup">sign up</button>
      </div>

      <button
        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </nav>
  );
};

export default NavBar;