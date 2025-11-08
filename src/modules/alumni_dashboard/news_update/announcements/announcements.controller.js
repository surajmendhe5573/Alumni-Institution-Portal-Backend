import AnnouncementsService from "./announcements.service.js";
 import { statusCode } from '../../../../utils/constants/statusCode.js';

export default class AnnouncementsController {
  constructor() {
    this.announcementsService =  AnnouncementsService;
  }

  getAll = async (req, res, next) => {
    try {
      const announcements = await this.announcementsService.getAll();
      res.success("All Announcements fetched successfully", announcements, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.announcementsService.create(req.body);
      res.success("Announcement created successfully", data, statusCode.CREATED);
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
      const deleted = await this.announcementsService.delete(req.params.id);
      if (!deleted) return res.fail("Announcement not found", statusCode.NOT_FOUND);

      res.success("Announcement deleted successfully", statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
