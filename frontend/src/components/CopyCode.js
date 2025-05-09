import React, { useState } from "react";
import "../styles/CopyCode.css";

const CopyCode = ({ player, gameID, isOpen }) => {
  const { isPartyLeader } = player;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(gameID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {isPartyLeader && isOpen ? (
        <div className="copy-code-wrapper">
          {copied && <div className="copy-success">Game ID copied!</div>}
          <h3>Send this code to your friends for them to join</h3>
          <div className="copy-section">
            <p className="mono">{gameID}</p>
            <button onClick={handleCopy}>COPY CODE</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CopyCode;