import mongoose from "mongoose";

const pollOptionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [pollOptionSchema],
    votedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: "profile" }], // stores user IDs to prevent multiple votes
  },
  { timestamps: true }
);

export const POLL_MODEL= mongoose.model("poll", pollSchema);
