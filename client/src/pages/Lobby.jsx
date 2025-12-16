import { useState } from 'react';

export const Lobby = ({ joinRoom }) => {
    const [roomId, setRoomId] = useState('');

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
        </div>
    );
};
