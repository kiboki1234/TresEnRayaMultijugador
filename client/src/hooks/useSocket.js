import { useEffect, useState } from 'react';
import { socket } from '../services/socket';

export const useSocket = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    const connect = () => {
        socket.connect();
    };

    const disconnect = () => {
        socket.disconnect();
    };

    return { isConnected, connect, disconnect, socket };
};
