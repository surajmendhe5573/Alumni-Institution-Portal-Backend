import Alumni_dataService from "./alumni_data.service.js";
 import { statusCode } from '../../../utils/constants/statusCode.js';

export default class Alumni_dataController {
  constructor() {
    this.alumni_dataService =  Alumni_dataService;
  }

  create = async (req, res, next) => {
    try {
      const alumni = await this.alumni_dataService.create(req.body);
      res.success("Alumni created successfully", alumni, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const alumni = await this.alumni_dataService.getAll(req.query);
      res.success("Fetched all alumni successfully", alumni, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const alumni = await this.alumni_dataService.getById(req.params.id);
      if (!alumni)
        return res.fail("Alumni not found", statusCode.NOT_FOUND);

      res.success("Fetched alumni successfully", alumni, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const alumni = await this.alumni_dataService.update(req.params.id, req.body);
      if (!alumni)
        return res.fail("Alumni not found", statusCode.NOT_FOUND);

      res.success("Alumni updated successfully", alumni, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const alumni = await this.alumni_dataService.delete(req.params.id);
      if (!alumni)
        return res.fail("Alumni not found", statusCode.NOT_FOUND);

      res.success("Alumni deleted successfully", alumni, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
