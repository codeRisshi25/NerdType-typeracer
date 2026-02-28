import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <span className="nav-logo" onClick={() => navigate('/')}>nerdtype</span>
      <button
        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); setMenuOpen(false); }}>home</a></li>
        <li><a href="https://risshi.is-a.dev" target="_blank" rel="noopener noreferrer">about</a></li>
        <li><a href="https://github.com/codeRisshi25" target="_blank" rel="noopener noreferrer">github</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;