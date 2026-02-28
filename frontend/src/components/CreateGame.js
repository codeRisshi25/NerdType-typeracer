import React, { useState } from 'react';
import NavBar from './NavBar';
import Loader from './Loader';
import Footer from './Footer';
import socket from '../socketConfig';
import '../styles/GameLobby.css';

const CreateGame = () => {
  const [nickName, setNickName] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    socket.emit('create-game', nickName);
  };

  return (
    <div className="page-container">
      <NavBar />
      <main className="lobby-main">
        <div className="lobby-card">
          <h1 className="lobby-title">create game</h1>
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="nickName">nickname</label>
              <input
                id="nickName"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="your name"
                required
                autoComplete="off"
              />
            </div>
            {loading ? (
              <div className="loader-wrap"><Loader /></div>
            ) : (
              <button type="submit" className="submit-btn">create</button>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateGame;
