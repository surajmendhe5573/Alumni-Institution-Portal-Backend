import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "profile", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "profile", required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

export const CHAT_MODEL = mongoose.model("chatMessage", chatMessageSchema);
