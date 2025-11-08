import PollsService from "./polls.service.js";
 import { statusCode } from '../../../../utils/constants/statusCode.js';

export default class PollsController {
  constructor() {
    this.pollsService =  PollsService;
  }

  getAllPolls = async (req, res, next) => {
    try {
      const polls = await this.pollsService.getAll();
      res.success("All polls fetched successfully", polls, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  createPoll = async (req, res, next) => {
    try {
      const poll = await this.pollsService.createPoll(req.body);
      res.success("Poll created successfully", poll, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  submitVote = async (req, res, next) => {
    try {
      const poll = await this.pollsService.submitVote(req.body);
      res.success("Vote submitted successfully", poll, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  getPollResults = async (req, res, next) => {
    try {
      const poll = await this.pollsService.getPollResults(req.params.pollId);
      res.success("Poll results fetched successfully", poll, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
