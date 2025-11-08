import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    fundName: { type: String, required: true }, // e.g. "Scholarship Fund 2025"
    donorName: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    donationType: { type: String, enum: ["one-time", "recurring"], default: "one-time" },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    paymentStatus: { type: String, enum: ["pending", "successful", "failed"], default: "pending" },
  },
  { timestamps: true }
);

export const DONATION_MODEL = mongoose.model("donations", donationSchema);
