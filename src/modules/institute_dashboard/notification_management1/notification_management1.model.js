import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipients: {
      type: String,
      enum: ["All Alumni", "Batch-wise"],
      required: true,
    },
    subject: { type: String, required: true },
    bodyContent: { type: String, required: true },
    batch: { type: String }, // e.g. "2021-2025" (for Batch-wise)
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notification-template",
    }, // optional link to template
    status: {
      type: String,
      enum: ["Sent", "Pending", "Failed"],
      default: "Pending",
    },
    sentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const NOTIFICATION_MODEL1 = mongoose.model(
  "notification_management1",
  notificationSchema
);
