import Notification_managementService from "./notification_management.service.js";
import { statusCode } from "../../../utils/constants/statusCode.js";

export default class Notification_managementController {
  constructor() {
    this.notification_managementService = Notification_managementService;
  }

  getAll = async (req, res, next) => {
    try {
      const notifications =
        await this.notification_managementService.getAll();
      res.success("Fetched all notifications", notifications, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  sendNotification = async (req, res, next) => {
    try {
      const notification =
        await this.notification_managementService.sendNotification(req.body);
      res.success(
        "Notification sent successfully",
        notification,
        statusCode.CREATED
      );
    } catch (err) {
      next(err);
    }
  };

}
