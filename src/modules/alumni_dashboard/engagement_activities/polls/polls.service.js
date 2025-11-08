 import { POLL_MODEL } from "./polls.model.js";
 import { PROFILE_MODEL } from "../../profile/profile.model.js"; 

 
 class PollsService {

  async getAll(){
    return await POLL_MODEL.find();
  }
   
  async createPoll(data) {
    const { question, options } = data;

    if (!question || !options || options.length < 2) {
      throw new Error("Question and at least 2 options are required");
    }

    const poll = await POLL_MODEL.create({
      question,
      options: options.map((opt) => ({ option: opt })),
    });

    return poll;
  }

  async submitVote({ pollId, selectedOption, userId }) {
  const student = await PROFILE_MODEL.findById(userId);
  if (!student) {
    throw new Error("Student not found");
  }

  const poll = await POLL_MODEL.findById(pollId);
  if (!poll) throw new Error("Poll not found");

  if (poll.votedUsers.includes(userId)) {
    throw new Error("Student already voted");
  }

  // Atomic update: increment votes and push userId in one go
  const updatedPoll = await POLL_MODEL.findOneAndUpdate(
    { _id: pollId, "options.option": selectedOption, votedUsers: { $ne: userId },  },
    {
      $inc: { "options.$.votes": 1 },
      $push: { votedUsers: userId },
    },
    { new: true }
  );

  if (!updatedPoll) {
    throw new Error("Invalid option selected");
  }

  return updatedPoll;
}

  async getPollResults(pollId) {
    const poll = await POLL_MODEL.findById(pollId);
    if (!poll) throw new Error("Poll not found");
    return poll;
  }
}

export default new PollsService();
