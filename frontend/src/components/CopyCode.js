import React, { useState } from 'react';
import '../styles/CopyCode.css';

const CopyCode = ({ player, gameID, isOpen }) => {
  const [copied, setCopied] = useState(false);

  if (!player || !player.isPartyLeader || !isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(gameID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="copy-code-wrapper">
      <p className="copy-label">share this code with friends</p>
      <div className="copy-section">
        <span className="copy-id mono">{gameID}</span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? 'copied!' : 'copy'}
        </button>
      </div>
    </div>
  );
};

export default CopyCode;