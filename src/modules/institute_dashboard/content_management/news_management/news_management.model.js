import mongoose from "mongoose";

const newsManagementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, enum: ["Published", "Draft"], default: "Draft" },

}, {timestamps:true});


export const NEWS_MANAGEMENT_MODEL= mongoose.model("news-management", newsManagementSchema);