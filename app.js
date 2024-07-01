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

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
