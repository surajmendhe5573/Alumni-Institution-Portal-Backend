import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  announcementTitle: { type: String,required: true },
  date: { type: Date, required: true },
  class: { type: String, required: true},
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },

}, {timestamps:true});


export const ANNOUNCEMENT_MODEL = mongoose.model('news-announcement', announcementSchema);