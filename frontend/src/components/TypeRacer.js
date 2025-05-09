import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountDown from "./CountDown.js";
import StartBtn from "./StartBtn.js";
import socket from "../socketConfig.js";
import DisplayWords from './DisplayWords.js';
import Form from './Form.js';
import ProgressBar from "./ProgressBar.js";
import ScoreBoard from "./ScoreBoard.js";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import CopyCode from "./CopyCode.js";
import "../styles/TypeRacer.css";

const findPlayer = (players) => {
  return players.find((player) => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
  const navigate = useNavigate();
  const { _id, players, words, isOpen, isOver } = gameState;
  const player = findPlayer(players);
  
  useEffect(() => {
    if (_id === "") {
      navigate("/", { replace: true });
    }
  }, [_id, navigate]);
  
  return (
    <div className="page-container">
      <div className="blur-screen">
        <NavBar/>
        <div className="game-container">
          <CopyCode player={player} gameID={_id} isOpen={isOpen} />
          <DisplayWords words={words} player={player} />
          <Form isOpen={isOpen} isOver={isOver} player={player} gameID={_id} />
          <ProgressBar players={players} player={player} wordsLength={words.length} />
          <CountDown />
          <StartBtn player={player} gameID={_id} />
          {isOver && <ScoreBoard players={players} />}
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default TypeRacer;