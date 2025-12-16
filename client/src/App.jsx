import { useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import { useTicTacToe } from './hooks/useTicTacToe';
import { Lobby } from './pages/Lobby';
import { Board } from './components/Board';
import './index.css';

function App() {
  const { isConnected } = useSocket();
  const {
    gameState,
    playerSymbol,
    joinRoom,
    makeMove,
    resetGame,
    error,
    roomId
  } = useTicTacToe();

  if (!isConnected && roomId) {
    // Reconnecting state or initial connection
    return <div className="loading">Connecting...</div>;
  }

  return (
    <div className="app">
      {error && <div className="error-banner">{error}</div>}

      {!roomId ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Board
          gameState={gameState}
          playerSymbol={playerSymbol}
          makeMove={makeMove}
          resetGame={resetGame}
          roomId={roomId}
        />
      )}
    </div>
  );
}

export default App;
