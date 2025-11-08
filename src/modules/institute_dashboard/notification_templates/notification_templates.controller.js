import Notification_templatesService from "./notification_templates.service.js";
import { statusCode } from '../../../utils/constants/statusCode.js';

export default class Notification_templatesController {
  constructor() {
    this.notification_templatesService =  Notification_templatesService;
  }

  create = async (req, res, next) => {
    try {
      const template = await this.notification_templatesService.create(req.body);
      res.success("Template created successfully", template, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const templates = await this.notification_templatesService.getAll(req.query);
      res.success("Fetched all templates successfully", templates, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const template = await this.notification_templatesService.update(req.params.id, req.body);
      if (!template)
        return res.fail("Template not found", statusCode.NOT_FOUND);
      res.success("Template updated successfully", template, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const template = await this.notification_templatesService.delete(req.params.id);
      if (!template)
        return res.fail("Template not found", statusCode.NOT_FOUND);
      res.success("Template deleted successfully", template, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
