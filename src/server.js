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

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("joinRoom", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) return;
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
    console.log(`👥 ${senderId} joined room ${roomId}`);
  });

  socket.on("sendMessage", async ({ sender, receiver, message }) => {
    try {
      const newMessage = await ChatService.saveMessage(sender, receiver, message);
      const roomId = [sender, receiver].sort().join("_");
      io.to(roomId).emit("receiveMessage", newMessage);
    } catch (err) {
      console.error("❌ Error sending message:", err.message);
    }
  });

  // ✅ New: fetch unread messages
  socket.on("getUnreadMessages", async ({ sender, receiver }) => {
    try {
      const unreadMessages = await ChatService.getUnreadMessages(sender, receiver);
      socket.emit("unreadMessages", unreadMessages);

      // ✅ Mark them as read after fetching
      if (unreadMessages.length > 0) {
        await ChatService.markMessagesAsRead(sender, receiver);

        const roomId = [sender, receiver].sort().join("_");
        io.to(roomId).emit("messagesRead", { sender, receiver });
      }
    } catch (err) {
      console.error("❌ Error fetching unread messages:", err.message);
    }
  });

  socket.on("markAsRead", async ({ sender, receiver }) => {
    try {
      await ChatService.markMessagesAsRead(sender, receiver);
      const roomId = [sender, receiver].sort().join("_");
      io.to(roomId).emit("messagesRead", { sender, receiver });
      console.log(`📖 Messages marked as read between ${sender} & ${receiver}`);
    } catch (err) {
      console.error("❌ Error marking messages as read:", err.message);
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