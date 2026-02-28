import React from 'react';
import '../styles/DisplayWords.css';

const DisplayWords = ({ words, player }) => {
  if (!player || !words.length) return null;

  const typedWords = words.slice(0, player.currentWordIndex).join(' ');
  const currentWord = words[player.currentWordIndex] || '';
  const wordsToBeTyped = words.slice(player.currentWordIndex + 1).join(' ');

  return (
    <div className="words-display">
      <span className="typed-text">{typedWords} </span>
      <span className="current-word">{currentWord}</span>
      <span className="remaining-text"> {wordsToBeTyped}</span>
    </div>
  );
};

export default DisplayWords;