import { GameRoom } from '../models/GameRoom.js';

class RoomManager {
    constructor() {
        this.rooms = new Map();
    }

    createRoom(roomId) {
        if (this.rooms.has(roomId)) {
            return this.rooms.get(roomId);
        }
        const room = new GameRoom(roomId);
        this.rooms.set(roomId, room);
        return room;
    }

    getRoom(roomId) {
        return this.rooms.get(roomId);
    }

    deleteRoom(roomId) {
        this.rooms.delete(roomId);
    }

    getRoomByPlayer(socketId) {
        for (const room of this.rooms.values()) {
            if (room.players.includes(socketId)) {
                return room;
            }
        }
        return null;
    }

    getAvailableRooms() {
        const available = [];
        for (const room of this.rooms.values()) {
            if (room.players.length < 2) {
                available.push({
                    id: room.id,
                    players: room.players.length
                });
            }
        }
        return available;
    }
}

export const roomManager = new RoomManager();
