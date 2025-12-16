import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocket } from './sockets/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://localhost:5173", "https://tres-en-raya-multijugador.vercel.app"],
    methods: ["GET", "POST"]
}));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://tres-en-raya-multijugador.vercel.app"],
        methods: ["GET", "POST"]
    }
});

// Setup Socket.io logic
setupSocket(io);

app.get('/', (req, res) => {
    res.send('Tic-Tac-Toe Server is running');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
