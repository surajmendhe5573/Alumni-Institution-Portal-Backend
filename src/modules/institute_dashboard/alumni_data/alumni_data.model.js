// import mongoose from 'mongoose';

// const alumniSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     batch: { type: String, required: true },
//     department: { type: String, required: true },
//     location: { type: String },
//     status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
//     email: { type: String, unique: true },
//   },
//   { timestamps: true }
// );

// export const ALUMNI_DATA_MODEL= mongoose.model('alumni-data', alumniSchema)
import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    batch: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    email: { type: String},   // optional email, but must be unique if provided
  },
  { timestamps: true }
);

// ensure the index is defined explicitly
alumniSchema.index({ email: 1 }, { unique: true, sparse: true });

export const ALUMNI_DATA_MODEL = mongoose.model('alumni-data', alumniSchema);