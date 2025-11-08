import { Router } from 'express';
import Notification_managementController from './notification_management.controller.js';

const router = Router();
const notification_managementController = new Notification_managementController();

router.get('/', notification_managementController.getAll);
router.post("/send", notification_managementController.sendNotification);

export default router;
