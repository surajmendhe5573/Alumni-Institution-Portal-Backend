import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    fundName: { type: String, required: true },
    donorName: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    donationType: { type: String, enum: ["one-time", "recurring"], default: "one-time" },
    recurringInterval: { type: String, enum: ["monthly", "yearly"], default: "monthly" }, 
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
  },
  { timestamps: true }
);

export const DONATION_MODEL = mongoose.model("donation1", donationSchema);
