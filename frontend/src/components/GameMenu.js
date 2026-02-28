import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/GameMenu.css';

const GameMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <NavBar />
      <main className="menu-main">
        <div className="menu-hero">
          <h1 className="hero-title">nerdtype</h1>
          <p className="hero-sub">race your friends in real-time</p>
        </div>
        <div className="menu-cards">
          <div className="menu-card" onClick={() => navigate('/game/create')}>
            <span className="card-icon">⌨</span>
            <h2 className="card-title">create</h2>
            <p className="card-desc">start a new race and invite friends</p>
          </div>
          <div className="menu-card" onClick={() => navigate('/game/join')}>
            <span className="card-icon">→</span>
            <h2 className="card-title">join</h2>
            <p className="card-desc">enter a game id to join a race</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameMenu;
