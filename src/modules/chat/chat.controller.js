import ChatService from "./chat.service.js";
 import { statusCode } from "../../utils/constants/statusCode.js"; 

export default class ChatController {
  constructor() {
    this.chatService =  ChatService;
  }

  sendMessage = async (req, res, next) => {
    try {
      const { sender, receiver, message } = req.body;
      const newMessage = await this.chatService.saveMessage(sender, receiver, message);
      res.success("Message sent", newMessage, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  // Fetch messages between two users
  getMessages = async (req, res, next) => {
    try {
      const { user1, user2 } = req.query;
      const messages = await this.chatService.getMessagesBetweenUsers(user1, user2);
      res.success("Messages fetched", messages, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
