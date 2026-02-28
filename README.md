# NerdType | Multiplayer Typeracer

NerdType is a real-time multiplayer typing race game built with the **MERN** stack and **Socket.io**. It features a modern, clean, dark-terminal aesthetic inspired by Monkeytype.

## Features
- Real-time multiplayer racing against friends with instant WPM syncing
- Dynamic visual feedback (glowing text, glassmorphism cards, CSS gradient background)
- Accurate WPM calculation and leaderboards per match
- Mobile-responsive layout

## Stack
- **Frontend:** React, React Router, CSS Variables (Custom dark theme)
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB

## How to Run Locally

### 1. Using Docker Compose (Recommended)
You can run the entire stack (Database, Backend API, Frontend React app) using a single command:
```bash
docker-compose up --build
```
The app will be available at `http://localhost:3000`.

### 2. Manual Setup
Make sure you have MongoDB running locally or on a cloud provider.

**Backend Setup:**
```bash
cd backend
cp .env.example .env  # Edit .env with your MongoDB URI if needed
npm install
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

## Credits
UI/UX overhauled with a modern dark terminal aesthetic, using JetBrains Mono and Inter fonts.