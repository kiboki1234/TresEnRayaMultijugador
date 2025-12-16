import { roomManager } from '../services/RoomManager.js';

export const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join_room', (roomId) => {
            let room = roomManager.getRoom(roomId);
            if (!room) {
                room = roomManager.createRoom(roomId);
            }

            if (room.addPlayer(socket.id)) {
                socket.join(roomId);
                console.log(`User ${socket.id} joined room ${roomId}`);

                // Notify player of their symbol
                const symbol = room.playerMap[socket.id];
                socket.emit('player_assignment', symbol);

                // Broadcast updated state
                io.to(roomId).emit('game_update', room.getState());
            } else {
                socket.emit('error', 'Room is full');
            }
        });

        socket.on('make_move', ({ roomId, index }) => {
            const room = roomManager.getRoom(roomId);
            if (room) {
                const result = room.makeMove(socket.id, index);
                if (result.valid) {
                    io.to(roomId).emit('game_update', room.getState());
                } else {
                    socket.emit('error', result.message);
                }
            }
        });

        socket.on('reset_game', (roomId) => {
            const room = roomManager.getRoom(roomId);
            if (room) {
                room.resetGame();
                io.to(roomId).emit('game_update', room.getState());
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            const room = roomManager.getRoomByPlayer(socket.id);
            if (room) {
                room.removePlayer(socket.id);
                io.to(room.id).emit('player_left');
                io.to(room.id).emit('game_update', room.getState());
                if (room.players.length === 0) {
                    roomManager.deleteRoom(room.id);
                }
            }
        });
    });
};
