import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/GameMenu.css';

const GameMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container full-width">
      <div className="container-inner">
        <NavBar />
        
        <main className="landing-main">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <div className="beta-badge">
                <span className="dot pulse"></span> v2.0 is live now
              </div>
              
              <h1 className="hero-title">
                Type fast.<br />
                <span className="text-accent">Beat friends.</span>
              </h1>
              
              <p className="hero-desc">
                The ultimate minimalist typing battleground. Create a room, share the link, and dominate the leaderboard in a sleek, distraction-free environment.
              </p>
              
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => navigate('/game/create')}>
                  <span className="btn-icon">+</span> Create Room
                </button>
                <button className="btn-secondary" onClick={() => navigate('/game/join')}>
                  <span className="btn-icon">→</span> Join Race
                </button>
              </div>
              
              <div className="hero-metrics">
                <div className="metric">
                  <div className="metric-val">12k<span className="text-accent">+</span></div>
                  <div className="metric-lbl">TYPISTS</div>
                </div>
                <div className="metric">
                  <div className="metric-val">850k<span className="text-accent">+</span></div>
                  <div className="metric-lbl">RACES</div>
                </div>
                <div className="metric">
                  <div className="metric-val">62</div>
                  <div className="metric-lbl">AVG WPM</div>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="terminal-card">
                <div className="term-header">
                  <div className="term-time">00:34 / 01:00</div>
                  <div className="term-wpm">182 WPM</div>
                </div>
                <div className="term-body">
                  <span className="word-corr">The quick brown fox </span>
                  <span className="word-curr">jumps</span><br />
                  <span className="word-pend">over the lazy dog. Programming is the art of telling another human what one wants.</span>
                </div>
                <div className="term-footer">
                  <div className="progress-line"></div>
                  <div className="term-status">waiting for opponents...</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <h2 className="section-title">
              <span className="section-label">FEATURES</span><br />
              Everything you need to type <br />
              <span className="text-sub">faster</span>
            </h2>
            
            <div className="features-grid">
              <div className="feat-card">
                <div className="feat-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="feat-title">Real-time Multiplayer</h3>
                <p className="feat-desc">Race against friends or random opponents with zero latency. Create private rooms and customize the rules for the ultimate face off.</p>
              </div>
              <div className="feat-card">
                <div className="feat-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                </div>
                <h3 className="feat-title">Detailed Analytics</h3>
                <p className="feat-desc">Visualize your progress. Track your WPM trends, accuracy heatmaps, and identify weak keys to improve precisely where it matters.</p>
              </div>
              <div className="feat-card">
                <div className="feat-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                </div>
                <h3 className="feat-title">Custom Themes</h3>
                <p className="feat-desc">Make it yours. Customize your typing interface with modern, distraction-free themes and font pairings to match your setup.</p>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section className="details-section">
            <div className="details-content">
              <h2 className="details-title">Master every keystroke</h2>
              <p className="details-desc">Our advanced engine analyzes your typing patterns to provide personalized training exercises targeting your weakest keys.</p>
              
              <ul className="details-list">
                <li><span className="check-icon">✓</span> Smart error tracking</li>
                <li><span className="check-icon">✓</span> Adaptive difficulty</li>
                <li><span className="check-icon">✓</span> Instant feedback loops</li>
              </ul>
            </div>
            <div className="details-visual">
              <div className="mock-keyboard">
                <div className="key row-1"></div>
                <div className="key row-1 highlight"></div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <h2 className="cta-title">Ready to test your <span className="text-accent">speed</span>?</h2>
            <p className="cta-desc">Join thousands of other typists improving their skills daily. No registration required to start, but needed to track progress.</p>
            <button className="btn-cta" onClick={() => navigate('/game/create')}>
              Join the Race Now
            </button>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default GameMenu;
