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
  // handles the timer event
  socket.on("timer", async ({ playerID, gameID }) => {
    socket.emit(playerID);
    let countDown = 5;
    let game = await Game.findById(gameID);
    let player = game.players.id(playerID);
    if (player.isPartyLeader) {
      let timerID = setInterval(async () => {
        if(countDown >= 0){
          io.to(gameID).emit("timer", { countDown, msg: "Starting Game.." });
          countDown--;
        } else {
          game.isOpen = false;
          game = await game.save();
          io.to(gameID).emit("updateGame", game);
          // startGameCLock(gameID);
          clearInterval(timerID); 
        }
      },1000);
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
      let apiText = await randomTextApi.getData();
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

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
