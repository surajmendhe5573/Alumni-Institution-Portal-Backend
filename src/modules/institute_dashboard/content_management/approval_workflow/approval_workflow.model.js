import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date },
    status: { type: String, enum: ["Draft", "In Review"], default: "Draft" }

}, {timestamps:true});


export const APPROVAL_WORKFLOW_MODEL = mongoose.model("approval-workflow", approvalSchema);