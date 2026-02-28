import React from 'react';
import '../styles/ProgressBarComponent.css';

const calculatePercentage = (player, wordsLength) => {
  if (!player || !wordsLength) return 0;
  return ((player.currentWordIndex / wordsLength) * 100).toFixed(1);
};

const ProgressBar = ({ player, players, wordsLength }) => {
  if (!player) return null;

  return (
    <div className="progress-container">
      {players.map((p) => {
        const pct = calculatePercentage(p, wordsLength);
        const isMe = p._id === player._id;
        return (
          <div className={`prog-wrap ${isMe ? 'current-player' : ''}`} key={p._id}>
            <div className="prog-label">
              <span className="player-nickname">{p.nickName}{isMe ? ' (you)' : ''}</span>
              <span className="prog-pct">{pct}%</span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${pct}%` }}
                aria-valuenow={parseFloat(pct)}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;