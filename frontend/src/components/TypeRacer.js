import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountDown from './CountDown';
import StartBtn from './StartBtn';
import socket from '../socketConfig';
import DisplayWords from './DisplayWords';
import Form from './Form';
import ProgressBar from './ProgressBar';
import ScoreBoard from './ScoreBoard';
import NavBar from './NavBar';
import Footer from './Footer';
import CopyCode from './CopyCode';
import '../styles/TypeRacer.css';

const findPlayer = (players) => {
  return players.find((player) => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
  const navigate = useNavigate();
  const { _id, players, words, isOpen, isOver } = gameState;
  const player = findPlayer(players);

  useEffect(() => {
    if (_id === '') {
      navigate('/', { replace: true });
    }
  }, [_id, navigate]);

  return (
    <div className="page-container full-width">
      <NavBar />
      <main className="game-main">
        <div className="game-container">
          <CopyCode player={player} gameID={_id} isOpen={isOpen} />
          <CountDown />
          <StartBtn player={player} gameID={_id} />

          <div className="typing-section">
            <DisplayWords words={words} player={player} />
            <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
          </div>

          <ProgressBar players={players} player={player} wordsLength={words?.length} />
          {isOver && <ScoreBoard players={players} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TypeRacer;