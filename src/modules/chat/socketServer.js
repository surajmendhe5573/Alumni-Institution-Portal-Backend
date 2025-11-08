// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import ChatService from "./chat.service.js";

// const app = express();

// // Only JSON middleware
// app.use(express.json());

// // You can keep your REST routes here
// // app.use("/api/v1/chat", chatRoute);

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "*" }, // allow all origins for testing
// });

// // Socket.IO logic
// io.on("connection", (socket) => {
//   console.log("User connected", socket.id);

//   socket.on("joinRoom", ({ senderId, receiverId }) => {
//     const roomId = `${senderId}_${receiverId}`;
//     socket.join(roomId);
//     console.log(`User ${senderId} joined room ${roomId}`);
//   });

//   socket.on("sendMessage", async ({ sender, receiver, message }) => {
//     try {
//       const newMessage = await ChatService.saveMessage(sender, receiver, message);
//       const roomId = `${sender}_${receiver}`;
//       io.to(roomId).emit("receiveMessage", newMessage);

//       const oppositeRoom = `${receiver}_${sender}`;
//       io.to(oppositeRoom).emit("receiveMessage", newMessage);
//     } catch (err) {
//       console.error(err.message);
//       socket.emit("error", err.message);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.id);
//   });
// });

// server.listen(7001, () => {
//   console.log("Socket.IO server running on port 7000");
// });
import express from "express";
import http from "http";
import { Server } from "socket.io";
import ChatService from "./chat.service.js";

const app = express();

// Middleware
app.use(express.json());

// Optional: test route to verify server is running
app.get("/", (req, res) => {
  res.send("Socket.IO chat server is running 🚀");
});

const server = http.createServer(app);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing (you can restrict later)
    methods: ["GET", "POST"],
  },
});

// ✅ Socket.IO Events
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Join chat room
  socket.on("joinRoom", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) return;
    const roomId = `${senderId}_${receiverId}`;
    socket.join(roomId);
    console.log(`👥 ${senderId} joined room ${roomId}`);
  });

  // Send message
  socket.on("sendMessage", async ({ sender, receiver, message }) => {
    if (!sender || !receiver || !message) {
      return socket.emit("error", "Invalid message payload");
    }

    try {
      // Save message in DB
      const newMessage = await ChatService.saveMessage(sender, receiver, message);

      // Emit to both chat rooms
      const roomId = `${sender}_${receiver}`;
      const oppositeRoom = `${receiver}_${sender}`;

      io.to(roomId).emit("receiveMessage", newMessage);
      io.to(oppositeRoom).emit("receiveMessage", newMessage);

      console.log(`💬 Message sent from ${sender} to ${receiver}`);
    } catch (err) {
      console.error("❌ Error saving message:", err.message);
      socket.emit("error", err.message);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ Start Server
const PORT = 7000;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on ws://localhost:${PORT}`);
});
