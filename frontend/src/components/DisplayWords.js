import React from 'react';
import '../styles/DisplayWords.css';

const DisplayWords = ({ words, player, players, userInput = '' }) => {
  if (!player || !words.length) return null;

  // Filter out the current user to only show opponents overlay tags
  const opponents = players ? players.filter(p => p.socketID !== player.socketID) : [];

  return (
    <div className="words-display">
      {words.map((word, wordIndex) => {
        const isTyped = wordIndex < player.currentWordIndex;
        const isCurrent = wordIndex === player.currentWordIndex;
        const isRemaining = wordIndex > player.currentWordIndex;

        // Find any opponents currently typing this word
        const opponentsOnWord = opponents.filter(p => p.currentWordIndex === wordIndex && p.WPM === -1);

        // Render previously typed words
        if (isTyped) {
          return (
            <span key={wordIndex} className="word-wrapper">
              {opponentsOnWord.map(opp => (
                <span key={opp._id} className="opponent-tag">{opp.nickName}</span>
              ))}
              <span className="typed-text">{word} </span>
            </span>
          );
        }

        // Render remainder untouched words
        if (isRemaining) {
          return (
            <span key={wordIndex} className="word-wrapper">
              {opponentsOnWord.map(opp => (
                <span key={opp._id} className="opponent-tag">{opp.nickName}</span>
              ))}
              <span className="remaining-text">{word} </span>
            </span>
          );
        }

        // Render the active word the user is currently typing
        if (isCurrent) {
          const isCorrect = word.startsWith(userInput);
          const isError = !isCorrect && userInput.length > 0;

          return (
            <span key={wordIndex} className={`word-wrapper current-word ${isError ? 'error-word-container' : ''}`}>
              {opponentsOnWord.map(opp => (
                <span key={opp._id} className="opponent-tag">{opp.nickName}</span>
              ))}
              
              {word.split('').map((char, charIdx) => {
                let className = "current-word-untyped";
                
                if (charIdx < userInput.length) {
                  className = char === userInput[charIdx] ? "current-word-typed" : "current-word-error";
                }
                
                // Render cursor bar if this is the exact typing index
                const isCursorPos = charIdx === userInput.length;
                
                return (
                  <span key={charIdx} className={`${className} ${isCursorPos && !isError ? 'cursor-active' : ''}`}>
                    {char}
                  </span>
                );
              })}
              
              {/* Extra wrong characters typed beyond the word length */}
              {userInput.length > word.length && (
                <span className="current-word-error extra-chars">
                  {userInput.slice(word.length)}
                </span>
              )}
              
              {/* Cursor if we are beyond the end of the word */}
              {userInput.length >= word.length && !isError && (
                <span className="cursor-active end-cursor"></span>
              )}

              <span> </span>
            </span>
          );
        }

        return null;
      })}
    </div>
  );
};

export default DisplayWords;