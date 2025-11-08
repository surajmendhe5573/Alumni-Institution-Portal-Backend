import mongoose from "mongoose";

const eventManagementSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventDate: { type: Date },
    batch: { type: String },
    deadline: { type: Date },
    status: { type: String, enum: ["Active", "Draft", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export const EVENT_MANAGEMENT_MODEL = mongoose.model("event_management", eventManagementSchema);
