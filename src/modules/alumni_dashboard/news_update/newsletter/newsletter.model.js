import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  month: { type: String, required: true },
  theme: { type: String, required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }

}, { timestamps: true });

export const NEWSLETTER_MODEL = mongoose.model("Newsletter", newsletterSchema);
