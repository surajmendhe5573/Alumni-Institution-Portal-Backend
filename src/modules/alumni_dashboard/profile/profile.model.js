import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema({
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  linkedin: { type: String },
  verified: { type: Boolean, default: false },
});

const membershipSchema = new mongoose.Schema({
  membershipType: { type: String }, // e.g., "Premium", "Basic"
  startDate: { type: Date },
  endDate: { type: Date },
  status: {
    type: String,
    enum: ["Active", "Expired", "Not Subscribed"],
    default: "Not Subscribed",
  },
});

const expertiseSchema = new mongoose.Schema({
  skills: [{ type: String }], 
});

const basicInfoSchema = new mongoose.Schema({
  fullName: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  dob: { type: Date },
  nationality: { type: String },
  religion: { type: String },
  bloodGroup: { type: String },
  verified: { type: Boolean, default: false },
});

const networkSchema = new mongoose.Schema({
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "profile" }],
});

const workExperienceSchema = new mongoose.Schema({
  companyName: { type: String },
  position: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  verified: { type: Boolean, default: false },
});

const educationSchema = new mongoose.Schema({
  institutionName: { type: String },
  degree: { type: String },
  fieldOfStudy: { type: String },
  startYear: { type: Number },
  endYear: { type: Number },
  verified: { type: Boolean, default: false },
});

const studentProfileSchema = new mongoose.Schema(
  {
    batch: { type: String }, 
    profileImage: { type: String }, 

    contactInformation: contactInfoSchema,
    membership: membershipSchema,
    expertise: expertiseSchema,
    basicInformation: basicInfoSchema,
    network: networkSchema,
    workExperience: [workExperienceSchema],
    education: [educationSchema],
    isMentor: { type: Boolean, default: false },
  },
  
  { timestamps: true }
);

export const PROFILE_MODEL = mongoose.model("profile", studentProfileSchema);
