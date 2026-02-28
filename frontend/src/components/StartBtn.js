import React, { useState } from 'react';
import socket from '../socketConfig.js';
import '../styles/StartBtn.css';

const StartBtn = ({ player, gameID }) => {
  const [showBtn, setShowBtn] = useState(true);

  if (!player || !player.isPartyLeader || !showBtn) return null;

  const onClickHandler = () => {
    socket.emit('timer', { playerID: player._id, gameID });
    setShowBtn(false);
  };

  return (
    <div className="startBtn-wrapper">
      <button className="startBtn" onClick={onClickHandler} aria-label="Start game">
        start game
      </button>
    </div>
  );
};

export default StartBtn;