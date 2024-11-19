import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black text-blue-200">
      <div className="flex flex-col justify-center items-center min-h-screen px-6 md:px-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center max-w-screen-xl mx-auto">
          {/* Left Section: Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Play Chess Online, Anytime, Anywhere
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Challenge your friends, sharpen your skills, and become a master.
            </p>
            <div className="mt-8">
              <Button onClick={() => navigate("/game")}>
                Start Playing
              </Button>
            </div>
          </div>

          {/* Right Section: Chess Board Image */}
          <div className="flex justify-center">
            <img
              src="/landing.jpg"
              className="w-full max-w-sm md:max-w-md rounded-lg shadow-2xl transition-transform transform hover:scale-105"
              alt="Chess board"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ChessOnline. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
