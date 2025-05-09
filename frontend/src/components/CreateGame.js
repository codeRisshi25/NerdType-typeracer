import React, { useState } from "react";
import NavBar from "./NavBar";
import Loader from "./Loader";
import Footer from "./Footer";
import socket from "../socketConfig";
import "../styles/GameLobby.css";

const CreateGame = (props) => {
  const [nickName, setNickName] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setNickName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    socket.emit("create-game", nickName);
  };

  return (
    <>
      <div className="blur-screen">
        <NavBar />
        <div className="wrapper-main">
          <div className="form-wrapper">
            <h1 className="join-game">create game</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="nickName">Enter Nick Name</label>
                <input
                  type="text"
                  name="nickName"
                  value={nickName}
                  onChange={onChange}
                  placeholder="Nick Name"
                  className="form-control"
                  required
                />
              </div>
              {loading ? (
              <Loader /> // Render loader if loading is true
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>)}
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default CreateGame;
