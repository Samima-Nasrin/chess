# Online Chess Platform

An interactive, real-time multiplayer chess game with live gameplay synchronization built using WebSockets and a React frontend.


---

##  Features

- Real-time multiplayer chess matches via WebSockets  
- Move validation, game state syncing, and turn tracking  
- Intuitive and minimalist user interface  
- Responsive layout optimized for all screen sizes  
- Custom timer and player tracking  
- Clean separation of client and server logic

---

## 🛠Tech Stack

**Frontend**: React.js, TypeScript, Tailwind CSS  
**Backend**: Node.js, WebSocket (ws)  

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Samima-Nasrin/chess.git
cd chess

cd frontend
npm install
npm run dev

cd ../backend
npm install
node server.js

frontend (by default) - http://localhost:5173
backend (by default) - ws://localhost:3000
