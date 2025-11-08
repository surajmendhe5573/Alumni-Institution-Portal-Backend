import News_managementService from "./news_management.service.js";
import { statusCode } from '../../../../utils/constants/statusCode.js';

export default class News_managementController {
  constructor() {
    this.news_managementService =  News_managementService;
  }

   create = async (req, res, next) => {
    try {
      const result = await this.news_managementService.create(req.body);
      res.success("News article created successfully", result, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };
  
  getAll = async (req, res, next) => {
    try {
      const result = await this.news_managementService.getAll();
      res.success("Fetched all news articles successfully", result, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const result = await this.news_managementService.update(req.params.id, req.body);
      if (!result) return res.fail("News article not found", statusCode.NOT_FOUND);

      res.success("News article updated successfully", result, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const result = await this.news_managementService.delete(req.params.id);
      if (!result) return res.fail("News article not found", statusCode.NOT_FOUND);

      res.success("News article deleted successfully", statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}