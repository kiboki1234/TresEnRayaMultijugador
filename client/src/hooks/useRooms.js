import { useState, useEffect } from 'react';
import { socket } from '../services/socket';

export const useRooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        function onRoomsUpdate(updatedRooms) {
            setRooms(updatedRooms);
        }

        socket.on('rooms_update', onRoomsUpdate);

        return () => {
            socket.off('rooms_update', onRoomsUpdate);
        };
    }, []);

    return { rooms };
};
