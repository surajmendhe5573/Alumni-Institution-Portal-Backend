import CampaignsService from "./campaigns.service.js";
 import { statusCode } from '../../../utils/constants/statusCode.js';

export default class CampaignsController {
  constructor() {
    this.campaignsService =  CampaignsService;
  }

  create = async (req, res, next) => {
    try {
      const campaign = await this.campaignsService.create(req.body);
      res.success("Campaign created successfully", campaign, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const campaigns = await this.campaignsService.getAll();
      res.success("Fetched all campaigns successfully", campaigns, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const campaign = await this.campaignsService.getById(req.params.id);
      if (!campaign) return res.fail("Campaign not found", statusCode.NOT_FOUND);

      res.success("Fetched campaign successfully", campaign, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const campaign = await this.campaignsService.update(req.params.id, req.body);
      if (!campaign) return res.fail("Campaign not found", statusCode.NOT_FOUND);

      res.success("Campaign updated successfully", campaign, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const campaign = await this.campaignsService.delete(req.params.id);
      if (!campaign) return res.fail("Campaign not found", statusCode.NOT_FOUND);

      res.success("Campaign deleted successfully", campaign, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
