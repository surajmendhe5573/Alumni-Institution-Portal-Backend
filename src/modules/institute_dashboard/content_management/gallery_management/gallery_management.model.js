import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ["image", "video"], default: "image" },
});

const galleryManagementSchema = new mongoose.Schema(
  {
    albumName: { type: String, required: true },
    description: { type: String },
    media: [mediaSchema],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const GALLERY_MANAGEMENT_MODEL = mongoose.model("gallery-management", galleryManagementSchema);
