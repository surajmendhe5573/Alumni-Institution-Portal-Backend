import { PROFILE_MODEL } from "./profile.model.js";
class ProfileService {
   
  async getAll() {
    return PROFILE_MODEL.find();
  }

  async create(data, file) {
  const profileData = {
    ...data,
    profileImage: file ? file.path : data.profileImage,
  };

  const profile = new PROFILE_MODEL(profileData);
  return profile.save();
}

  async getById(id) {
    return PROFILE_MODEL.findById(id);
  }

  async update(id, data, file) {
    const updateData = {
      ...data,
      profileImage: file ? file.path : data.profileImage,
    };

    return PROFILE_MODEL.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return PROFILE_MODEL.findByIdAndDelete(id);
  }

  async becomeMentor(userId, mentorData) {
    const profile = await PROFILE_MODEL.findById(userId);
    if (!profile) throw new Error("Profile not found");

    profile.mentorDetails = {
      isMentor: true,
      ...mentorData,
      status: "Pending", // admin can later approve
    };

    await profile.save();
    return profile;
  }
}

export default new ProfileService();
