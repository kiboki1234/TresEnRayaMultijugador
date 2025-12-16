import { PLAYER_X, PLAYER_O, GAME_STATUS, WINNING_COMBINATIONS, MAX_PLAYERS } from '../utils/constants.js';

export class GameRoom {
    constructor(id) {
        this.id = id;
        this.players = []; // Array of socket IDs
        this.board = Array(9).fill(null);
        this.turn = PLAYER_X;
        this.status = GAME_STATUS.WAITING;
        this.winner = null;
        this.playerMap = {}; // socketId -> 'X' or 'O'
    }

    addPlayer(socketId) {
        if (this.players.length >= MAX_PLAYERS) return false;
        this.players.push(socketId);

        // Assign symbol
        const symbol = this.players.length === 1 ? PLAYER_X : PLAYER_O;
        this.playerMap[socketId] = symbol;

        if (this.players.length === MAX_PLAYERS) {
            this.status = GAME_STATUS.PLAYING;
        }
        return true;
    }

    removePlayer(socketId) {
        this.players = this.players.filter(id => id !== socketId);
        delete this.playerMap[socketId];
        this.status = GAME_STATUS.WAITING;
        this.resetGame(); // Reset board if player leaves? Or just pause? For MVP, reset or abort.
    }

    makeMove(socketId, index) {
        if (this.status !== GAME_STATUS.PLAYING) return { valid: false, message: 'Game not active' };
        if (this.board[index] !== null) return { valid: false, message: 'Cell occupied' };
        if (this.playerMap[socketId] !== this.turn) return { valid: false, message: 'Not your turn' };

        this.board[index] = this.turn;

        const win = this.checkWin();
        if (win) {
            this.status = GAME_STATUS.FINISHED;
            this.winner = this.turn;
        } else if (this.board.every(cell => cell !== null)) {
            this.status = GAME_STATUS.FINISHED;
            this.winner = 'DRAW';
        } else {
            this.turn = this.turn === PLAYER_X ? PLAYER_O : PLAYER_X;
        }

        return { valid: true };
    }

    checkWin() {
        return WINNING_COMBINATIONS.some(combo => {
            const [a, b, c] = combo;
            return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c];
        });
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.turn = PLAYER_X;
        this.status = this.players.length === MAX_PLAYERS ? GAME_STATUS.PLAYING : GAME_STATUS.WAITING;
        this.winner = null;
    }

    getState() {
        return {
            id: this.id,
            players: this.players,
            board: this.board,
            turn: this.turn,
            status: this.status,
            winner: this.winner
        };
    }
}
