# Multiplayer Tic-Tac-Toe

A real-time multiplayer Tic-Tac-Toe game built with **React** (Vite) and **Node.js** (Express + Socket.io).

## Features

*   **Real-time Multiplayer**: Play against friends instantly.
*   **Room System**: Create private rooms or join existing ones via Room ID.
*   **Visual Feedback**: Interactive UI with turn indicators and win/loss notifications.
*   **Responsive Design**: Works on desktop and mobile.

## Tech Stack

*   **Frontend**: React, Vite, CSS Modules (Vanilla), Socket.io Client.
*   **Backend**: Node.js, Express, Socket.io.

## Getting Started

### Prerequisites

*   Node.js (v14+ recommended)
*   npm

### Installation & Running

1.  **Clone the repository** (if you haven't already).

2.  **Start the Backend**:
    ```bash
    cd server
    npm install
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

3.  **Start the Frontend**:
    Open a new terminal window:
    ```bash
    cd client
    npm install
    npm run dev
    ```
    The client will start on `http://localhost:5173` (or similar).

## How to Play

1.  Open the game in a browser.
2.  **Player 1**: Click "Create New Game". Share the displayed **Room ID** with your friend.
3.  **Player 2**: Enter the Room ID and click "Join Game".
4.  The game starts! X goes first.

## Project Structure

```
root
├── client/          # frontend React application
├── server/          # backend Node.js application
└── README.md        # project documentation
```
