import { Route, Routes, useNavigate } from "react-router-dom";
import CreateGame from "./components/CreateGame.js";
import JoinGame from "./components/JoinGame.js";
import GameMenu from "./components/GameMenu.js";
import socket from "./socketConfig.js";
import { useEffect, useState } from "react";
import TypeRacer from "./components/TypeRacer.js";

function App() {
  let navigate = useNavigate();
  const [gameState, setGameState] = useState({
    _id: "",
    isOpen: false,
    players: [],
    words: [],
  });
  useEffect(() => {
    socket.on("updateGame", (game) => {
      setGameState(game);
    });
    return () => {
      socket.removeAllListeners("updateGame");
    };
  }, []);
  useEffect(() => {
    if (gameState._id !== "") {
      navigate(`/game/${gameState._id}`);
    }
  }, [gameState._id, navigate]);
  return (
    <Routes>
      <Route exact path="/" element={<GameMenu />} />
      <Route path="/game/create" element={<CreateGame />} />
      <Route path="/game/join" element={<JoinGame />} />
      <Route
        path="/game/:gameId"
        element={<TypeRacer gameState={gameState} />}
      />
    </Routes>
  );
}

export default App;
