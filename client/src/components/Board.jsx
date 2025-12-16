export const Board = ({ gameState, playerSymbol, makeMove, resetGame, roomId }) => {
    const { board, winner, turn, status } = gameState;

    const isMyTurn = turn === playerSymbol;
    const gameActive = status === 'playing';

    const getStatusMessage = () => {
        if (status === 'waiting') return 'Waiting for opponent...';
        if (winner) {
            if (winner === 'DRAW') return "It's a Draw!";
            return winner === playerSymbol ? 'You Win!' : 'You Lose!';
        }
        return isMyTurn ? "Your Turn" : "Opponent's Turn";
    };

    return (
        <div className="game-container">
            <div className="header">
                <h2 className="room-id">Room: {roomId}</h2>
                <div className={`status ${isMyTurn ? 'active' : ''}`}>
                    {getStatusMessage()}
                </div>
                <div className="player-info">
                    You are: <span className={`symbol ${playerSymbol}`}>{playerSymbol}</span>
                </div>
            </div>

            <div className="board">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className={`cell ${cell ? 'occupied' : ''} ${cell === 'X' ? 'x' : 'o'}`}
                        onClick={() => gameActive && makeMove(index)}
                        disabled={!gameActive || cell !== null || !isMyTurn}
                    >
                        {cell}
                    </button>
                ))}
            </div>

            {winner && (
                <button onClick={resetGame} className="btn reset">
                    Play Again
                </button>
            )}
        </div>
    );
};
