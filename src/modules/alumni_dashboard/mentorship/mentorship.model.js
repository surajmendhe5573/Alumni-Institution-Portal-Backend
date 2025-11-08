import mongoose from "mongoose";

const mentorshipSchema = new mongoose.Schema({
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "profile", required: true},
    menteeId: { type: mongoose.Schema.Types.ObjectId, ref: "profile", required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending"},
    message: { type: String }, // optional note from mentee
    
  },{ timestamps: true });

export const MENTORSHIP_MODEL = mongoose.model("mentorship", mentorshipSchema);
