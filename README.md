# r3mot3-coding-challenge

Here’s a short README.md explaining how to install, run, and test the real-time chat app. 🚀

📌 Real-Time Chat App (Node.js & React)
This is a real-time chat application with authentication, WebSocket-based messaging, and RESTful API. The backend is built with Node.js, Express, and Socket.IO, while the frontend is built with React and TypeScript.

🚀 Features
✅ User Authentication (JWT-based Sign In & Sign Up)
✅ Real-Time Chat (WebSocket with Socket.IO)
✅ Create & Join Chat Rooms
✅ Message Persistence (PostgreSQL with Sequelize)
✅ Secure API Endpoints

🛠 Installation
1️⃣ Clone the Repository
git clone https://github.com/farex4sure/r3mot3-coding-challenge.git
cd realtime-chat
🖥 Backend Setup (Node.js + Express + Socket.IO)

2️⃣ Install Dependencies
cd backend
npm install

3️⃣ Set Up Environment Variables
Create a .env file inside backend/ and add:
PORT=8080
POSTGRES_URL=postgres://youruser:yourpassword@localhost:5432/realtime_chat
JWT_SECRET=your_jwt_secret

4️⃣ Start the Backend
npm run dev
🚀 The backend should now be running on http://localhost:5000

💻 Frontend Setup (React + TypeScript)
5️⃣ Install Frontend Dependencies
cd ../frontend
npm install

6️⃣ Set Up Environment Variables
Create a .env file inside frontend/ and add:
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_SOCKET_URL=http://localhost:8080

7️⃣ Start the Frontend
npm start
🎉 The frontend should now be running on http://localhost:3000

🧪 Testing the App
1️⃣ Test the API using Postman
POST /api/auth/signup → Register a new user
POST /api/auth/signin → Login and get a JWT token
GET /api/rooms → Fetch available chat rooms
POST /api/rooms → Create a new chat room
POST /api/chats/:roomId/messages → Send a message

2️⃣ Test Real-Time Chat
Open http://localhost:3000
Sign in and join a chat room
Open another browser tab with a different user
Send a message and watch it appear in real-time 🎉

🐞 Troubleshooting
Problem: WebSocket not connecting?
✅ Check if the backend is running on port 8080
✅ Restart both backend & frontend
✅ Open Developer Console (F12) → Console and look for errors

Problem: Database connection failed?
✅ Ensure PostgreSQL is running
✅ Check DB_URI in .env
