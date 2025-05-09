import React from 'react';
import "../styles/DisplayWords.css";

const DisplayWords = ({ words, player }) => {
  // Get words that have been typed
  const typedWords = words.slice(0, player.currentWordIndex).join(" ");
  
  // Get the current word being typed
  const currentWord = words[player.currentWordIndex];
  
  // Get words that need to be typed
  const wordsToBeTyped = words.slice(player.currentWordIndex + 1).join(" ");
  
  return (
    <div className="words-display">
      <span className="typed-text">{typedWords} </span>
      <span className="current-word">{currentWord}</span>
      <span className="remaining-text"> {wordsToBeTyped}</span>
    </div>
  );
};

export default DisplayWords;