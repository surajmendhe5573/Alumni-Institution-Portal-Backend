import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ["Active", "Inactive", "Expired"],default: "Active" }

}, {timestamps:true});


export const ANNOUNCEMENT_MODEL = mongoose.model("announcement", announcementSchema);