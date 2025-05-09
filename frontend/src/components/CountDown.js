import React, { useState, useEffect } from "react";
import socket from "../socketConfig.js";
import "../styles/CountDown.css";

const CountDown = () => {
  const [timer, setTimer] = useState({ countDown: "", msg: "" });

  useEffect(() => {
    socket.on("timer", (timeData) => {
      setTimer(timeData);
    });
    
    socket.on("done", () => {
      socket.removeAllListeners("timer");
    });
    
    return () => {
      socket.off("timer");
      socket.off("done");
    };
  }, []);

  const { countDown, msg } = timer;

  if (!countDown && !msg) return null;

  return (
    <div className="countdown-container">
      {countDown && <h3 className="countdown">{countDown}</h3>}
      {msg && <p className="countdown-message">{msg}</p>}
    </div>
  );
};

export default CountDown;