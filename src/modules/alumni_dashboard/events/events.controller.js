import EventsService from "./events.service.js";
 import { statusCode } from '../../../utils/constants/statusCode.js';

export default class EventsController {
  constructor() {
    this.eventsService =  EventsService;
  }

  create = async (req, res, next) => {
    try {
      const event = await this.eventsService.create(req.body);
      res.status(statusCode.CREATED).json({success: true, message: "Event created successfully", data: event});
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const { type } = req.query;
      const events = await this.eventsService.getAll(type);
      res.status(statusCode.OK).json({success: true, message: "Events fetched successfully", data: events});
    } catch (err) {
      next(err);
    }
  };
}
