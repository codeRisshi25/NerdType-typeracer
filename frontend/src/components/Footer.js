import React from 'react';
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    <a 
                        href="https://github.com/codeRisshi25" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        @codeRisshi25
                    </a>
                </p>
                <p className="footer-copyright">© {new Date().getFullYear()} NerdType</p>
            </div>
        </footer>
    );
}

export default Footer;