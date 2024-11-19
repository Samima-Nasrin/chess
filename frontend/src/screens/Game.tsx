import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [player1Name, setPlayer1Name] = useState("Waiting...");
  const [player2Name, setPlayer2Name] = useState("Waiting...");
  const [waitingForOpponent, setWaitingForOpponent] = useState(true);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          setPlayer1Name(message.payload.player1Name);
          setPlayer2Name(message.payload.player2Name);
          setWaitingForOpponent(false); // Stop waiting when opponent joins
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;
        case GAME_OVER:
          console.log("Game Over");
          break;
        default:
          break;
      }
    };
  }, [socket, chess]);

  if (!socket)
    return <div className="text-center text-white mt-10">Connecting...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 flex items-center justify-center p-4">
      <div className="p-6 bg-neutral-900 rounded-lg shadow-2xl w-full max-w-5xl space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
          Online Chess Game
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chess Board Section */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="bg-neutral-700 p-4 rounded-lg shadow-inner w-full">
              <ChessBoard
                chess={chess}
                setBoard={setBoard}
                socket={socket}
                board={board}
              />
            </div>
          </div>
          {/* Player Info & Controls Section */}
          <div className="bg-neutral-800 p-6 rounded-lg flex flex-col items-center justify-center space-y-4">
            {!started ? (
              <Button
                onClick={() =>
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  )
                }
              >
                Start Game
              </Button>
            ) : (
              <div className="text-center text-lg font-semibold text-white space-y-2">
                <p>
                  Player 1 ~white: <span className="text-green-400">{player1Name}</span>
                </p>
                <p>
                  Player 2 ~black: <span className="text-blue-400">{player2Name}</span>
                </p>
              </div>
            )}
            {waitingForOpponent && started && (
              <div className="text-center text-gray-400 space-y-2">
                <p className="text-lg">Waiting for Opponent...</p>
                <div className="loader"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
