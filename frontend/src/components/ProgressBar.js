import React from "react";
import "../styles/ProgressBarComponent.css";

const calculatePercentage = (player, wordsLength) => {
  if (player.currentWordIndex !== 0) {
    return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%";
  }
  return "0%";
};

const ProgressBar = ({ player, players, wordsLength }) => {
  const percentage = calculatePercentage(player, wordsLength);

  return (
    <div className="progress-container">
      <div className="prog-wrap current-player">
        <h5 className="player-nickname">{player.nickName} (You)</h5>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: percentage }}
            aria-valuenow={parseFloat(percentage)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {percentage}
          </div>
        </div>
      </div>

      {players.map((playerObj) => {
        if (playerObj._id !== player._id) {
          const percentage = calculatePercentage(playerObj, wordsLength);
          return (
            <div className="prog-wrap" key={playerObj._id}>
              <h5 className="player-nickname">{playerObj.nickName}</h5>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: percentage }}
                  aria-valuenow={parseFloat(percentage)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {percentage}
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ProgressBar;