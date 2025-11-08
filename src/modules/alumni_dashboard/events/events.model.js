import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  class: { type: String, required: true },
  status: {
    type: String,
    enum: ["join now", "view gallery", "schedule"],
    required: true,
  },
}, { timestamps: true });


export const EVENT_MODEL= mongoose.model("event", eventSchema);
