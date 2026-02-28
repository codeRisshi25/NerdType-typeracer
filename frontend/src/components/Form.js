import React, { useEffect, useRef } from 'react';
import socket from '../socketConfig.js';
import '../styles/Form.css';

const Form = ({ isOpen, isOver, gameID, userInput, setUserInput }) => {
  const textInput = useRef(null);

  useEffect(() => {
    if (!isOpen && textInput.current) {
      textInput.current.focus();
    }
  }, [isOpen]);

  const onChange = (e) => {
    const value = e.target.value;
    const lastChar = value.charAt(value.length - 1);
    
    // Transmit word when space is pressed
    if (lastChar === ' ') {
      socket.emit('userInput', { userInput, gameID });
      setUserInput('');
    } 
    // Allow empty string (backspacing all the way) or valid characters
    else if (value === '' || /^[a-zA-Z']$/.test(lastChar)) {
      setUserInput(value);
    }
  };

  const onSubmit = (e) => e.preventDefault();

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          readOnly={isOpen || isOver}
          onChange={onChange}
          value={userInput}
          className="words-form"
          ref={textInput}
          placeholder={isOver ? 'game over' : isOpen ? 'waiting to start...' : ''}
          aria-label="Type racing input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};

export default Form;