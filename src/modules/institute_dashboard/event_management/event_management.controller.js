import Event_managementService from "./event_management.service.js";
 import { statusCode } from '../../../utils/constants/statusCode.js';

export default class Event_managementController {
  constructor() {
    this.event_managementService =  Event_managementService;
  }

  create = async (req, res, next) => {
    try {
      const event = await this.event_managementService.create(req.body);
      res.success("Event created successfully", event, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const events = await this.event_managementService.getAll();
      res.success("Fetched all events successfully", events, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const event = await this.event_managementService.getById(req.params.id);
      if (!event) return res.fail("Event not found", statusCode.NOT_FOUND);

      res.success("Fetched event successfully", event, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const event = await this.event_managementService.update(req.params.id, req.body);
      if (!event) return res.fail("Event not found", statusCode.NOT_FOUND);

      res.success("Event updated successfully", event, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const event = await this.event_managementService.delete(req.params.id);
      if (!event) return res.fail("Event not found", statusCode.NOT_FOUND);

      res.success("Event deleted successfully", statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
