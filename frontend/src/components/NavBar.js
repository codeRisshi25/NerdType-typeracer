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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="36"
            viewBox="0 0 44 40"
            fill="none"
            className="logo-svg"
            onClick={handleHomeClick}
            style={{ cursor: 'pointer' }}
          >
            <g clipPath="url(#clip0_9_44)">
              <path
                d="M24.8997 3.36841H13.2303C12.8585 3.36841 12.5571 3.65114 12.5571 3.99997C12.5571 4.3488 12.8586 4.63153 13.2303 4.63153H24.8996C25.2714 4.63153 25.5728 4.3488 25.5728 3.99997C25.5728 3.65114 25.2714 3.36841 24.8997 3.36841Z"
                fill="#6BDE3B"
              />
              {/* SVG paths remain the same */}
              <path
                d="M31.1832 3.36841H27.5926C27.2208 3.36841 26.9194 3.65114 26.9194 3.99997C26.9194 4.3488 27.2209 4.63153 27.5926 4.63153H31.1832C31.555 4.63153 31.8564 4.3488 31.8564 3.99997C31.8564 3.65114 31.555 3.36841 31.1832 3.36841Z"
                fill="#6BDE3B"
              />
              <path
                d="M38.6973 21.8948H30.7494C30.3775 21.8948 30.0762 22.1776 30.0762 22.5263C30.0762 22.8752 30.3776 23.1579 30.7494 23.1579H38.5887V32.8421H35.3385C34.6549 32.8421 34.1006 33.362 34.1006 34.0034V35.3684H10.3131V34.0034C10.3131 33.362 9.75893 32.8421 9.07523 32.8421H5.82494V23.1579H27.781C28.1528 23.1579 28.4542 22.8751 28.4542 22.5263C28.4542 22.1775 28.1527 21.8948 27.781 21.8948H5.71643C5.03272 21.8948 4.47852 22.4147 4.47852 23.0561V32.9439C4.47852 33.5853 5.03272 34.1052 5.71643 34.1052H8.96664V35.4702C8.96664 36.1117 9.52085 36.6316 10.2045 36.6316H34.2091C34.8927 36.6316 35.447 36.1117 35.447 35.4702V34.1052H38.6972C39.3808 34.1052 39.9351 33.5853 39.9351 32.9439V23.0561C39.9352 22.4147 39.381 21.8948 38.6973 21.8948Z"
                fill="#6BDE3B"
              />
            </g>
            <defs>
              <clipPath id="clip0_9_44">
                <rect
                  width="42.6377"
                  height="40"
                  fill="white"
                  transform="translate(0.887939)"
                />
              </clipPath>
            </defs>
          </svg>
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