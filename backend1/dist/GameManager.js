"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    // Generate unique random usernames for both players
                    const player1Name = this.generateRandomUsername();
                    const player2Name = this.generateRandomUsername();
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    // Send INIT_GAME message to both players with their usernames
                    this.pendingUser.send(JSON.stringify({
                        type: messages_1.INIT_GAME,
                        payload: { player1Name, player2Name },
                    }));
                    socket.send(JSON.stringify({
                        type: messages_1.INIT_GAME,
                        payload: { player1Name: player2Name, player2Name: player1Name },
                    }));
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
    generateRandomUsername() {
        const randomNum = Math.floor(Math.random() * 1000000);
        return `user${randomNum}`;
    }
}
exports.GameManager = GameManager;
