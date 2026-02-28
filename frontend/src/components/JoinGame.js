import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import socket from '../socketConfig';
import Loader from './Loader';
import '../styles/GameLobby.css';

const JoinGame = () => {
  const [userInput, setUserInput] = useState({ gameID: '', nickName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    socket.emit('join-game', userInput);
  };

  useEffect(() => {
    socket.on('error', (err) => {
      setError(err);
      setLoading(false);
    });
    return () => socket.off('error');
  }, [navigate]);

  return (
    <div className="page-container">
      <NavBar />
      <main className="lobby-main">
        <div className="lobby-card">
          <h1 className="lobby-title">join game</h1>
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="gameID">game id</label>
              <input
                id="gameID"
                type="text"
                name="gameID"
                value={userInput.gameID}
                onChange={onChange}
                placeholder="paste game id"
                required
                autoComplete="off"
              />
            </div>
            <div className="field">
              <label htmlFor="nickName">nickname</label>
              <input
                id="nickName"
                type="text"
                name="nickName"
                value={userInput.nickName}
                onChange={onChange}
                placeholder="your name"
                required
                autoComplete="off"
              />
            </div>
            {error && <p className="error-msg">{error}</p>}
            {loading ? (
              <div className="loader-wrap"><Loader /></div>
            ) : (
              <button type="submit" className="submit-btn">join</button>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JoinGame;