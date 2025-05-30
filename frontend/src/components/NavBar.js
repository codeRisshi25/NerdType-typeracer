import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
    setMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav-bg">
      <nav className="nav-bar">
        <div className="logo-main">
          <p className="heading-text">nerdtype</p>    
          <button 
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
        
        <div className={`nav-right ${menuOpen ? 'active' : ''}`}>
          <p className="sub-heading-text">
            <a href="/" onClick={handleHomeClick}>
              home
            </a>
          </p>
          <p className="sub-heading-text">
            <a
              href="https://risshi.is-a.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              about
            </a>
          </p>
          <p className="sub-heading-text">
            <a
              href="https://www.linkedin.com/in/risshi-is-a-dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact
            </a>
          </p>
          <p className="sub-heading-text github-link">
            <a
              href="https://github.com/codeRisshi25"
              target="_blank"
              rel="noopener noreferrer"
            >
              @codeRisshi25
            </a>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;