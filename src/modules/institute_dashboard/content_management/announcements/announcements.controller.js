import AnnouncementsService from "./announcements.service.js";
import { statusCode } from '../../../../utils/constants/statusCode.js';

export default class AnnouncementsController {
  constructor() {
    this.announcementsService =  AnnouncementsService;
  }

  create = async (req, res, next) => {
    try {
      const { title, description, startDate, endDate } = req.body;

      const announcementData = {
        title,
        description,
        startDate,
        endDate,
      };

      const result = await this.announcementsService.create(announcementData);
      res.success("Announcement created successfully", result, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const result = await this.announcementsService.getAll();
      res.success("Fetched all announcements successfully", result, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {

      const updated = await this.announcementsService.update(req.params.id, req.body);
      if (!updated) return res.fail("Announcement not found", statusCode.NOT_FOUND);

      res.success("Announcement updated successfully", updated, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const result = await this.announcementsService.delete(req.params.id);
      if (!result) return res.fail("Announcement not found", statusCode.NOT_FOUND);

      res.success("Announcement deleted successfully", statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
