import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    category: {
      type: String,
      enum: ["Donation", "Newsletter", "Invitation", "Custom", "Other"],
      default: "Custom",
    },
  },
  { timestamps: true }
);

export const TEMPLATE_MODEL = mongoose.model("notification-template", templateSchema);
