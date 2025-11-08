import mongoose from "mongoose";

const spotlightStorySchema = new mongoose.Schema({

    name: { type: String, required: true },
    achievement: {type: String, required: true },
    class: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active"},

  },{timestamps: true});

  
export const SPOTLIGHT_STORY_MODEL = mongoose.model("spotlightStory",spotlightStorySchema);
