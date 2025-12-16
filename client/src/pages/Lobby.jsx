import { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useRooms } from '../hooks/useRooms';

export const Lobby = ({ joinRoom }) => {
    const [roomId, setRoomId] = useState('');
    const { rooms } = useRooms();
    const { connect } = useSocket();

    // Ensure socket is connected to receive room updates
    useEffect(() => {
        connect();
    }, [connect]);

    const handleCreate = () => {
        const newId = Math.random().toString(36).substring(7);
        joinRoom(newId);
    };

    const handleJoin = (e) => {
        e.preventDefault();
        if (roomId.trim()) {
            joinRoom(roomId);
        }
    };

    return (
        <div className="lobby-container">
            <h1 className="title">Tic-Tac-Toe</h1>
            <div className="card">
                <button onClick={handleCreate} className="btn primary">
                    Create New Game
                </button>
                <div className="divider">OR</div>
                <form onSubmit={handleJoin} className="join-form">
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="input"
                    />
                    <button type="submit" className="btn secondary">
                        Join Game
                    </button>
                </form>
            </div>

            {rooms.length > 0 && (
                <div className="card" style={{ marginTop: '2rem' }}>
                    <h3>Available Rooms</h3>
                    <ul className="room-list">
                        {rooms.map((room) => (
                            <li key={room.id} className="room-item">
                                <span>Room: {room.id}</span>
                                <span className="player-count">({room.players}/2)</span>
                                <button
                                    className="btn small"
                                    onClick={() => joinRoom(room.id)}
                                >
                                    Join
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
