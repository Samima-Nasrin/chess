import { WebSocket } from "ws";
import { INIT_GAME, MOVE, GAME_OVER } from "./messages";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter(user => user !== socket);
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          // Generate unique random usernames for both players
          const player1Name = this.generateRandomUsername();
          const player2Name = this.generateRandomUsername();

          const game = new Game(this.pendingUser, socket);
          this.games.push(game);

          // Send INIT_GAME message to both players with their usernames
          this.pendingUser.send(
            JSON.stringify({
              type: INIT_GAME,
              payload: { player1Name, player2Name },
            })
          );
          socket.send(
            JSON.stringify({
              type: INIT_GAME,
              payload: { player1Name: player2Name, player2Name: player1Name },
            })
          );

          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if (message.type === MOVE) {
        const game = this.games.find(
          game => game.player1 === socket || game.player2 === socket
        );
        if (game) {
          game.makeMove(socket, message.payload.move);
        }
      }
    });
  }

  private generateRandomUsername(): string {
    const randomNum = Math.floor(Math.random() * 1_000_000);
    return `user${randomNum}`;
  }
}
