// const socket = io("http://localhost:7000"); // Your backend server

// const senderInput = document.getElementById("senderId");
// const receiverInput = document.getElementById("receiverId");
// const joinButton = document.getElementById("joinRoom");
// const messageForm = document.getElementById("message-form");
// const messageInput = document.getElementById("message-input");
// const messagesDiv = document.getElementById("messages");

// let senderId = "";
// let receiverId = "";

// // Join room
// joinButton.addEventListener("click", () => {
//   senderId = senderInput.value.trim();
//   receiverId = receiverInput.value.trim();

//   if (!senderId || !receiverId) {
//     alert("Enter both sender and receiver IDs");
//     return;
//   }

//   socket.emit("joinRoom", { senderId, receiverId });
//   addMessage(`✅ Joined chat with ${receiverId}`, "system");
// });

// // Send message
// messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const message = messageInput.value.trim();
//   if (!message) return;

//   socket.emit("sendMessage", { sender: senderId, receiver: receiverId, message });
//   addMessage(message, "sent");
//   messageInput.value = "";
// });

// // Receive message
// socket.on("receiveMessage", (data) => {
//   // Only show messages from the other person
//   if (data.sender !== senderId) {
//     addMessage(data.message, "received");
//   }
// });

// // Utility to display messages
// function addMessage(text, type) {
//   const msgDiv = document.createElement("div");
//   msgDiv.classList.add("msg");
//   if (type === "sent") msgDiv.classList.add("sent");
//   else if (type === "received") msgDiv.classList.add("received");
//   msgDiv.textContent = text;
//   messagesDiv.appendChild(msgDiv);
//   messagesDiv.scrollTop = messagesDiv.scrollHeight;
// }

// Connect to backend Socket.IO server
const socket = io("http://localhost:7000");

const senderInput = document.getElementById("senderId");
const receiverInput = document.getElementById("receiverId");
const joinButton = document.getElementById("joinRoom");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messagesDiv = document.getElementById("messages");

let senderId = "";
let receiverId = "";

joinButton.addEventListener("click", () => {
  senderId = senderInput.value.trim();
  receiverId = receiverInput.value.trim();

  if (!senderId || !receiverId) {
    alert("Enter both sender and receiver IDs");
    return;
  }

  // Join chat room (sorted roomId ensures consistency)
  socket.emit("joinRoom", { senderId, receiverId });

  // ✅ When receiver opens chat, mark all unread messages as read
  socket.emit("markAsRead", { sender: receiverId, receiver: senderId });

  addMessage(`✅ Joined chat with ${receiverId}`, "system");
});

// Send message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  // Emit message to backend
  socket.emit("sendMessage", { sender: senderId, receiver: receiverId, message });

  // Add message locally (sent by me)
  addMessage(message, "sent");

  messageInput.value = "";
});

// Receive message in real time
socket.on("receiveMessage", (data) => {
  if (data.sender !== senderId) {
    addMessage(data.message, "received");

    // ✅ When user receives a message, immediately mark as read
    socket.emit("markAsRead", { sender: data.sender, receiver: data.receiver });
  }
});

// Listen for messagesRead (read receipts)
socket.on("messagesRead", ({ sender, receiver }) => {
  // Only notify the sender who sent those messages
  if (sender === senderId && receiver === receiverId) {
    addMessage("✅ Messages seen", "system");
  }
});

// Utility to display messages in chat box
function addMessage(text, type) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("msg");

  if (type === "sent") msgDiv.classList.add("sent");
  else if (type === "received") msgDiv.classList.add("received");
  else msgDiv.style.textAlign = "center"; // for system messages

  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
