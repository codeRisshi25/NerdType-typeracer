const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Game = require('./Models/Game');
const randomTextApi = require('./randomTextApi');

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: CLIENT_ORIGIN }));

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

mongoose
  .connect(process.env.MONGO_CONN_STRING)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error(err));

io.on('connection', (socket) => {
  socket.on('userInput', async ({ userInput, gameID }) => {
    try {
      let game = await Game.findById(gameID);
      if (!game.isOpen && !game.isOver) {
        let player = game.players.find((p) => p.socketID === socket.id);
        if (!player) return;
        let word = game.words[player.currentWordIndex];
        if (word === userInput) {
          player.currentWordIndex++;
          if (player.currentWordIndex !== game.words.length) {
            game = await game.save();
            io.to(gameID).emit('updateGame', game);
          } else {
            const endTime = new Date().getTime();
            const { startTime } = game;
            player.WPM = calculateWPM(startTime, endTime, player, game.words);
            game = await game.save();
            socket.emit('done');
            io.to(gameID).emit('updateGame', game);
          }
        }
      }
    } catch (err) {
      console.log('userInput error:', err);
    }
  });

  socket.on('timer', async ({ playerID, gameID }) => {
    socket.emit(playerID);
    let countDown = 5;
    let game = await Game.findById(gameID);
    let player = game.players.id(playerID);
    if (player && player.isPartyLeader) {
      const timerID = setInterval(async () => {
        if (countDown >= 0) {
          io.to(gameID).emit('timer', { countDown, msg: 'Starting Game..' });
          countDown--;
        } else {
          game.isOpen = false;
          game = await game.save();
          io.to(gameID).emit('updateGame', game);
          startGameClock(gameID);
          clearInterval(timerID);
        }
      }, 1000);
    } else {
      console.error('Player not found or not the party leader');
    }
  });

  socket.on('join-game', async ({ gameID: _id, nickName }) => {
    try {
      let game = await Game.findById(_id);
      if (game.isOpen) {
        const gameID = game._id.toString();
        socket.join(gameID);
        game.players.push({ socketID: socket.id, nickName });
        game = await game.save();
        io.to(gameID).emit('updateGame', game);
      } else {
        socket.emit('error', 'Game is no longer open');
      }
    } catch (err) {
      socket.emit('error', 'Game not found');
      console.log(err);
    }
  });

  socket.on('create-game', async (nickName) => {
    try {
      const words = await randomTextApi.getData();
      let game = new Game();
      game.words = words;
      game.players.push({ socketID: socket.id, isPartyLeader: true, nickName });
      game = await game.save();
      const gameID = game._id.toString();
      socket.join(gameID);
      io.to(gameID).emit('updateGame', game);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('disconnect', async () => {
    try {
      const games = await Game.find({ 'players.socketID': socket.id, isOpen: true });
      for (const game of games) {
        game.players = game.players.filter((p) => p.socketID !== socket.id);
        await game.save();
        io.to(game._id.toString()).emit('updateGame', game);
      }
    } catch (err) {
      console.log('disconnect error:', err);
    }
  });
});

const startGameClock = async (gameID) => {
  let game = await Game.findById(gameID);
  game.startTime = new Date().getTime();
  game = await game.save();
  let time = 60;
  const timerID = setInterval(async () => {
    if (time >= 0) {
      io.to(gameID).emit('timer', { countDown: calculateTime(time), msg: 'Time Remaining' });
      time--;
    } else {
      const endTime = new Date().getTime();
      game = await Game.findById(gameID);
      const { startTime } = game;
      game.isOver = true;
      game.players.forEach((player, index) => {
        if (player.WPM === -1) {
          game.players[index].WPM = calculateWPM(startTime, endTime, player, game.words);
        }
      });
      game = await game.save();
      io.to(gameID).emit('updateGame', game);
      clearInterval(timerID);
    }
  }, 1000);
};

const calculateTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const calculateWPM = (startTime, endTime, player, totalWords) => {
  const numOfWords = player.currentWordIndex;
  const wordsTyped = totalWords.slice(0, numOfWords);
  const totalCharacters = wordsTyped.reduce((sum, str) => sum + str.length, 0);
  const timeInSeconds = Math.abs(endTime - startTime) / 1000;
  const minutes = timeInSeconds / 60;
  if (minutes === 0) return 0;
  return Math.floor((totalCharacters / 5) / minutes);
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
