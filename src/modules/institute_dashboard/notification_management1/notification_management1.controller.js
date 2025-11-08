import Notification_management1Service from "./notification_management1.service.js";
 import { statusCode } from '../../../utils/constants/statusCode.js';

export default class Notification_management1Controller {
  constructor() {
    this.notification_management1Service =  Notification_management1Service;
  }

  sendNotification = async (req, res, next) => {
    try {
      const notification =
        await this.notification_management1Service.sendNotification(req.body);
      res.success(
        "Notification sent successfully",
        notification,
        statusCode.CREATED
      );
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const notifications =
        await this.notification_management1Service.getAll();
      res.success(
        "Fetched all notifications successfully",
        notifications,
        statusCode.OK
      );
    } catch (err) {
      next(err);
    }
  };
}
