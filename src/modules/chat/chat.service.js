import { CHAT_MODEL } from "./chat.model.js";

class ChatService {
  // Save a new chat message
  async saveMessage(sender, receiver, message) {
    const chat = new CHAT_MODEL({ sender, receiver, message });
    return chat.save();
  }

  // Get chat messages between two users (mentor and mentee)
  async getMessagesBetweenUsers(user1, user2) {
    return CHAT_MODEL.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 }); // oldest first
  }

  // Mark messages as read
async markMessagesAsRead(sender, receiver) {
  await CHAT_MODEL.updateMany(
    { sender, receiver, read: false },
    { $set: { read: true } }
  );
  return { success: true };
}

}

export default new ChatService();
