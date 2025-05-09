import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import socket from "../socketConfig";
import "../styles/GameLobby.css";
import Loader from "./Loader";

const JoinGame = () => {
  const [userInput, setUserInput] = useState({ gameID: "", nickName: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    socket.emit("join-game", userInput);
  };

  useEffect(() => {
    socket.on("error", (error) => {
      setError(error);
      setLoading(false);
    });

    socket.on("game-joined", (gameState) => {
      navigate(`/game/${gameState._id}`);
    });

    return () => {
      socket.off("error");
      socket.off("game-joined");
    };
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="blur-screen">
        <NavBar />
        <div className="wrapper-main">
          <div className="form-card">
            <h1 className="form-title">join game</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="gameID" className="form-label">Game ID</label>
                <input
                  type="text"
                  name="gameID"
                  id="gameID"
                  value={userInput.gameID}
                  onChange={onChange}
                  placeholder="Enter Game ID"
                  className="form-control"
                  required
                  autoComplete="off"
                />
                
                <label htmlFor="nickName" className="form-label">Nick Name</label>
                <input
                  type="text"
                  name="nickName"
                  id="nickName"
                  value={userInput.nickName}
                  onChange={onChange}
                  placeholder="Choose a nickname"
                  className="form-control"
                  required
                  autoComplete="off"
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              {loading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : (
                <button type="submit" className="btn btn-primary btn-full">
                  Join Game
                </button>
              )}
            </form>
          </div>
          <div className="flex-grow"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default JoinGame;