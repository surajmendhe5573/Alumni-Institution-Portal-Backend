const socket = io("http://localhost:7000");

const senderInput = document.getElementById("senderId");
const receiverInput = document.getElementById("receiverId");
const joinButton = document.getElementById("joinRoom");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messagesDiv = document.getElementById("messages");

let senderId = "";
let receiverId = "";

// Join room
joinButton.addEventListener("click", () => {
  senderId = senderInput.value.trim();
  receiverId = receiverInput.value.trim();

  if (!senderId || !receiverId) {
    alert("Enter both sender and receiver IDs");
    return;
  }

  // Join chat room (sorted roomId ensures consistency)
  socket.emit("joinRoom", { senderId, receiverId });

  addMessage(`✅ Joined chat with ${receiverId}`, "system");

  // ✅ Fetch unread messages for this chat
  socket.emit("getUnreadMessages", { sender: receiverId, receiver: senderId });
});

// Receive unread messages when joining
socket.on("unreadMessages", (messages) => {
  if (messages.length > 0) {
    messages.forEach((msg) => addMessage(msg.message, "received"));
  } else {
    addMessage("No unread messages", "system");
  }
});

// Send message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  socket.emit("sendMessage", { sender: senderId, receiver: receiverId, message });
  addMessage(message, "sent");
  messageInput.value = "";
});

// Receive new real-time messages
socket.on("receiveMessage", (data) => {
  if (data.sender !== senderId) {
    addMessage(data.message, "received");
    socket.emit("markAsRead", { sender: data.sender, receiver: data.receiver });
  }
});

// Listen for messagesRead (read receipts)
socket.on("messagesRead", ({ sender, receiver }) => {
  if (sender === senderId && receiver === receiverId) {
    addMessage("✅ Messages seen", "system");
  }
});

// Utility function to add message to chat window
function addMessage(text, type) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("msg");
  if (type === "sent") msgDiv.classList.add("sent");
  else if (type === "received") msgDiv.classList.add("received");
  else msgDiv.style.textAlign = "center";
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
