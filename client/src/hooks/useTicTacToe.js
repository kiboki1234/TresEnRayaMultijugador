import { useState, useEffect } from 'react';
import { socket } from '../services/socket';

export const useTicTacToe = () => {
    const [gameState, setGameState] = useState({
        board: Array(9).fill(null),
        turn: 'X',
        status: 'waiting',
        winner: null,
        players: []
    });
    const [playerSymbol, setPlayerSymbol] = useState(null);
    const [roomId, setRoomId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        socket.on('game_update', (newGameState) => {
            setGameState(newGameState);
            setError('');
        });

        socket.on('player_assignment', (symbol) => {
            setPlayerSymbol(symbol);
        });

        socket.on('error', (msg) => {
            setError(msg);
        });

        socket.on('player_left', () => {
            setError('Opponent disconnected');
        });

        return () => {
            socket.off('game_update');
            socket.off('player_assignment');
            socket.off('error');
            socket.off('player_left');
        };
    }, []);

    const joinRoom = (id) => {
        setRoomId(id);
        socket.connect();
        socket.emit('join_room', id);
    };

    const makeMove = (index) => {
        socket.emit('make_move', { roomId, index });
    };

    const resetGame = () => {
        socket.emit('reset_game', roomId);
    };

    return {
        gameState,
        playerSymbol,
        joinRoom,
        makeMove,
        resetGame,
        error,
        roomId
    };
};
