import Analytics_reportsService from "./analytics_reports.service.js";
 import { statusCode } from '../../../utils/constants/statusCode.js';

export default class Analytics_reportsController {
  constructor() {
    this.analytics_reportsService =  Analytics_reportsService;
  }

  getEventParticipationTrends = async (req, res, next) => {
    try {
      const { year } = req.query;
      const data = await this.analytics_reportsService.getEventParticipationTrends(year);
      res.success("Fetched event participation trends successfully", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
