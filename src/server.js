// import './config/env.js';

// import { config } from 'dotenv';
// config();

// import app from './app.js';

// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV}`);
// });


import './config/env.js';
import { config } from 'dotenv';
config();

import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import ChatService from './modules/chat/chat.service.js';

const PORT = process.env.PORT || 7000;

// Create HTTP server from Express
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: { origin: "*" },
});

// Handle WebSocket connections
// io.on("connection", (socket) => {
//   console.log("✅ User connected:", socket.id);

//   socket.on("joinRoom", ({ senderId, receiverId }) => {
//     const roomId = `${senderId}_${receiverId}`;
//     socket.join(roomId);
//     console.log(`👥 ${senderId} joined room ${roomId}`);
//   });

//   socket.on("sendMessage", async ({ sender, receiver, message }) => {
//     try {
//       const newMessage = await ChatService.saveMessage(sender, receiver, message);

//       const roomId = `${sender}_${receiver}`;
//       io.to(roomId).emit("receiveMessage", newMessage);

//       const oppositeRoom = `${receiver}_${sender}`;
//       io.to(oppositeRoom).emit("receiveMessage", newMessage);
//     } catch (err) {
//       console.error("❌ Error sending message:", err.message);
//       socket.emit("error", err.message);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("🚪 User disconnected:", socket.id);
//   });
// });
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Join a consistent room name (alphabetically sorted)
  socket.on("joinRoom", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) return console.error("Missing sender/receiver in joinRoom");

    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
    console.log(`👥 ${senderId} joined room ${roomId}`);
  });

  socket.on("sendMessage", async ({ sender, receiver, message }) => {
    try {
      if (!sender || !receiver || !message) throw new Error("Missing fields");

      // Save message to DB
      const newMessage = await ChatService.saveMessage(sender, receiver, message);

      // Use the SAME sorted room name
      const roomId = [sender, receiver].sort().join("_");

      // Send to everyone in the room
      io.to(roomId).emit("receiveMessage", newMessage);

      console.log(`💬 Message sent in room ${roomId}`);
    } catch (err) {
      console.error("❌ Error sending message:", err.message);
      socket.emit("error", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("🚪 User disconnected:", socket.id);
  });
});


// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on http://localhost:${PORT}`);
});
