import React from 'react';
import '../styles/ProgressBarComponent.css';

const calculatePercentage = (player, wordsLength) => {
  if (!player || !wordsLength) return 0;
  return ((player.currentWordIndex / wordsLength) * 100).toFixed(1);
};

const ProgressBar = ({ player, players, wordsLength }) => {
  if (!player) return null;

  const colorClasses = ['color-accent', 'color-cyan', 'color-purple', 'color-green'];

  return (
    <div className="progress-container">
      {players.map((p, index) => {
        const pct = calculatePercentage(p, wordsLength);
        const isMe = p._id === player._id;
        // The current player is always yellow/accent, others get assigned from the array
        const colorClass = isMe ? colorClasses[0] : colorClasses[(index % 3) + 1];

        return (
          <div className={`prog-row ${colorClass}`} key={p._id}>
            <span className="prog-name">{p.nickName}{isMe ? ' (you)' : ''}</span>
            <div className="prog-track">
              <div 
                className="prog-fill" 
                style={{ width: `${pct}%` }} 
              />
            </div>
            <span className="prog-pct">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;