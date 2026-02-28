import React from 'react';
import '../styles/DisplayWords.css';

const DisplayWords = ({ words, player, userInput = '' }) => {
  if (!player || !words.length) return null;

  const typedWordsArray = words.slice(0, player.currentWordIndex);
  const currentWord = words[player.currentWordIndex] || '';
  const wordsToBeTyped = words.slice(player.currentWordIndex + 1).join(' ');

  const isCorrect = currentWord.startsWith(userInput);
  const isError = !isCorrect && userInput.length > 0;

  return (
    <div className="words-display">
      {typedWordsArray.map((w, i) => (
        <span key={i} className="typed-text">{w} </span>
      ))}
      
      {currentWord && (
        <span className={`current-word ${isError ? 'error-word-container' : ''}`}>
          {currentWord.split('').map((char, i) => {
            let className = "current-word-untyped";
            if (i < userInput.length) {
              className = char === userInput[i] ? "current-word-typed" : "current-word-error";
            }
            return <span key={i} className={className}>{char}</span>;
          })}
          {userInput.length > currentWord.length && (
            <span className="current-word-error extra-chars">
              {userInput.slice(currentWord.length)}
            </span>
          )}
        </span>
      )}
      
      <span className="remaining-text">{wordsToBeTyped ? ` ${wordsToBeTyped}` : ''}</span>
    </div>
  );
};

export default DisplayWords;