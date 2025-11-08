import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipients: { type: String, enum: ["All Alumni", "Batch-wise"], required: true,},
    subject: { type: String, required: true },
    bodyContent: { type: String, required: true },
    batch: { type: String }, // e.g., "2021-2025" or "2015-2019"
    status: { type: String, enum: ["Sent", "Pending", "Failed"], default: "Pending" },
    sentCount: { type: Number, default: 0 },

  },{ timestamps: true });

export const NOTIFICATION_MODEL = mongoose.model("notification_management", notificationSchema);
