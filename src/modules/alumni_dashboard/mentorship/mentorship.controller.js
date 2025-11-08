import MentorshipService from "./mentorship.service.js";
import { statusCode } from "../../../utils/constants/statusCode.js";

export default class MentorshipController {
  constructor() {
    this.mentorshipService = MentorshipService;
  }

  becomeMentor = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const result = await this.mentorshipService.becomeMentor(userId);
      res.success("You are now registered as a mentor", result, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  findMentors = async (req, res, next) => {
    try {
      const mentors = await this.mentorshipService.findMentors(req.query);
      res.success("Mentors fetched successfully", mentors, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  connect = async (req, res, next) => {
    try {
      const data = await this.mentorshipService.connectMentor(req.body);
      res.success("Connection request sent successfully", data, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  getPendingRequests = async (req, res, next) => {
    try {
      const { mentorId } = req.params;
      const data = await this.mentorshipService.getPendingRequests(mentorId);
      res.success("Pending mentorship requests fetched successfully", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  respond = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await this.mentorshipService.respondRequest(id, status);
      if (!updated) return res.fail("Request not found", statusCode.NOT_FOUND);
      res.success(`Request ${status.toLowerCase()} successfully`, updated, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  getConnections = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = await this.mentorshipService.getConnections(userId);
      res.success("Active mentorship connections fetched successfully", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
