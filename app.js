const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

// Models
const Game = require("./Models/Game");
const randomTextApi = require("./randomTextApi");

// CORS setup
app.use(cors({ origin: "http://localhost:3000" }));

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io with CORS
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/typeracerDB")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

// Socket.io connection
io.on("connection", (socket) => {
  socket.on('userInput', async({userInput,gameID})=>{
    try {
      let game = await Game.findById(gameID);
      if (!game.isOpen && !game.isOver){
        let player = game.players.find(player => player.socketID === socket.id);
        let word = game.words[player.currentWordIndex];
        if (word === userInput){
          player.currentWordIndex++;
          if (player.currentWordIndex !== game.words.length){
            game = await game.save();
            io.to(gameID).emit('updateGame',game);
          }
          else {
            let endTime = new Date().getTime();
            let {startTime} = game;
            player.WPM = calculateWPM(endTime,startTime,player);
            game = await game.save();
            socket.emit('done');
            io.to(gameID).emit('updateGame',game);
          }
        }
      }
    } catch(err){
      console.log("USER INPUT ERROR :- "+err)
    }
  })

  // handles the timer event
  socket.on("timer", async ({ playerID, gameID }) => {
    socket.emit(playerID);
    let countDown = 5;  // This is the countdown time
    let game = await Game.findById(gameID);
    let player = game.players.id(playerID);
    if (player.isPartyLeader) {
      let timerID = setInterval(async () => {
        if (countDown >= 0) {
          io.to(gameID).emit("timer", { countDown, msg: "Starting Game.." });
          countDown--;
        } else {
          game.isOpen = false;
          game = await game.save();
          io.to(gameID).emit("updateGame", game);
          startGameClock(gameID);
          clearInterval(timerID);
        }
      }, 1000);
    } else {
      // Optionally, handle the case where player is null or not the party leader
      console.error("Player not found or is not the party leader");
    }
  });
  // handles the join game event
  socket.on("join-game", async ({ gameID: _id, nickName }) => {
    try {
      let game = await Game.findById(_id);
      if (game.isOpen) {
        const gameID = game._id.toString();
        socket.join(gameID);
        let player = {
          socketID: socket.id,
          nickName,
        };
        game.players.push(player);
        game = await game.save();
        io.to(gameID).emit("updateGame", game);
      } else console.log("game not found");
    } catch (err) {
      console.log(err);
    }
  });
  // handles the create game event
  socket.on("create-game", async (nickName) => {
    try {
      let apiText = await randomTextApi.getData();  // Gets the api data here
      // Possiblity to set the number for words
      let game = new Game();
      game.words = apiText;
      let player = {
        socketID: socket.id,
        isPartyLeader: true,
        nickName,
      };
      game.players.push(player);
      game = await game.save();

      const gameID = game._id.toString();
      socket.join(gameID);
      io.to(gameID).emit("updateGame", game);
    } catch (err) {
      console.log(err);
    }
  });
});

startGameClock = async (gameID) => {
  let game = await Game.findById(gameID);
  game.startTime = new Date().getTime();
  game = await game.save();
  let time = 15; // This is the time for the actual racer
  let timerID = setInterval(function gameIntervalFunc() {
    if (time >= 0) {
      const formatTime = calculateTime(time);
      io.to(gameID).emit("timer", {
        countDown: formatTime,
        msg: "Time Remaining",
      });
      time--;
      return gameIntervalFunc;
    } else {
      (async () => {
        let endTime = new Date().getTime();
        let game = await Game.findById(gameID);
        let { startTime } = game;
        game.isOver = true;
        game.players.forEach((player, index) => {
          if (player.WMP === -1) {
            game.players[index].WPM = calculateWPM(startTime, endTime, player);
          }
        });
        game = await game.save();
        io.to(gameID).emit("updateGame", game);
        clearInterval(timerID);
      })();
    }
  }, 1000);
};
const calculateTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};
const calculateWPM = (startTime, endTime, player) => {
  let numOfWords = player.currentWordIndex;
  const timeInSeconds = (endTime - startTime) / 1000;
  const minutes = timeInSeconds / 60;
  const wpm = Math.floor(numOfWords / minutes);
  return wpm;
};

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
