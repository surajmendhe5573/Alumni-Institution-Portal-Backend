import { PROFILE_MODEL } from "../profile/profile.model.js";
import { MENTORSHIP_MODEL } from "./mentorship.model.js";

class MentorshipService {
  async becomeMentor(userId) {
    const profile = await PROFILE_MODEL.findById(userId);
    if (!profile) throw new Error("Profile not found");

    if (profile.isMentor) throw new Error("You are already registered as a mentor");

    profile.isMentor = true;
    await profile.save();

    return profile;
  }

  async findMentors(query = {}) {
    const mentors = await PROFILE_MODEL.find({ isMentor: true }).select(`
      _id
      basicInformation.fullName
      expertise.skills
      workExperience.companyName
      workExperience.position
      isMentor
    `);
    return mentors;
  }

  async connectMentor(data) {
    const { mentorId, menteeId, message } = data;
    if (!mentorId || !menteeId) throw new Error("Both mentorId and menteeId are required");

    const [mentor, mentee] = await Promise.all([
      PROFILE_MODEL.findById(mentorId),
      PROFILE_MODEL.findById(menteeId),
    ]);

    if (!mentor) throw new Error("Mentor profile not found");
    if (!mentee) throw new Error("Mentee profile not found");

    if (!mentor.isMentor) throw new Error("Selected user is not registered as a mentor");

    if (mentorId.toString() === menteeId.toString()) throw new Error("You cannot send a connection request to yourself");

    const existing = await MENTORSHIP_MODEL.findOne({ mentorId, menteeId, status: "Pending" });
    if (existing) throw new Error("Connection request already sent and pending approval.");

    return await MENTORSHIP_MODEL.create({ mentorId, menteeId, message });
  }

  async getPendingRequests(mentorId) {
    if (!mentorId) throw new Error("Mentor ID is required");

    const mentor = await PROFILE_MODEL.findById(mentorId);
    if (!mentor) throw new Error("Mentor profile not found");
    if (!mentor.isMentor) throw new Error("This user is not registered as a mentor");

    return await MENTORSHIP_MODEL.find({ mentorId, status: "Pending" })
      .populate("menteeId", "basicInformation.fullName basicInformation.email expertise.skills profileImage")
      .sort({ createdAt: -1 });
  }

  async respondRequest(id, status) {
    const mentorship = await MENTORSHIP_MODEL.findById(id);
    if (!mentorship) throw new Error("Request not found");

    mentorship.status = status;
    await mentorship.save();
    return mentorship;
  }

  async getConnections(userId) {
    return await MENTORSHIP_MODEL.find({
      $and: [
        { status: "Accepted" },
        { $or: [{ mentorId: userId }, { menteeId: userId }] },
      ],
    })
      .populate("menteeId", "basicInformation.fullName")
      .populate("menteeId", "basicInformation.fullName")
      .sort({ updatedAt: -1 });
  }

}

export default new MentorshipService();
