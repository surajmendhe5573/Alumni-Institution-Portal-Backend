import Spotlight_storiesService from "./spotlight_stories.service.js";
 import { statusCode } from '../../../../utils/constants/statusCode.js';

export default class Spotlight_storiesController {
  constructor() {
    this.spotlight_storiesService =  Spotlight_storiesService;
  }

 getAll = async (req, res, next) => {
    try {
      const stories = await this.spotlight_storiesService.getAll();
      res.success("All spotlight stories fetched successfully", stories, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

 create = async (req, res, next) => {
    try {
      const data = await this.spotlight_storiesService.create(req.body);
      res.success("Spotlight story created successfully", data, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const updated = await this.spotlight_storiesService.update(req.params.id, req.body);
      if (!updated) return res.fail("Story not found", statusCode.NOT_FOUND);

      res.success("Story updated successfully", updated, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deleted = await this.spotlight_storiesService.delete(req.params.id);

      if (!deleted) return res.fail("Story not found", statusCode.NOT_FOUND);
      res.success("Story deleted successfully", deleted, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
