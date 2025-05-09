import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/GameMenu.css";


const GameMenu = (props) => {
  let navigate = useNavigate();
  return (
    <div className="main-wrapper">
      <div className="blur-screen">
        <NavBar/>
        <div className="body-content">
          <p className="body-content-text">
            Race Your Friends in Real-Time with Nerdtype: The Ultimate Typing
            Challenge!
          </p>
          <div></div>
        </div>
        <div className="selection-wrapper">
          <div className="button-wrapper">
            <button
              className="btn-main"
              type="button"
              onClick={() => navigate("/game/create")}
            >
              CREATE
            </button>
            <p className="button-content">
              Start a new typing race and invite your friends to join. Set the
              rules, customize the challenge, and get ready for some fast-paced
              fun!"
            </p>
          </div>
          <div className="button-wrapper">
            <button
              className="btn-main"
              type="button"
              onClick={() => navigate("/game/join")}
            >
              JOIN
            </button>
              <p className="button-content">
                Start a new typing race and invite your friends to join. Set the
                rules, customize the challenge, and get ready for some
                fast-paced fun!"
              </p>
          </div>
        <Footer/>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
