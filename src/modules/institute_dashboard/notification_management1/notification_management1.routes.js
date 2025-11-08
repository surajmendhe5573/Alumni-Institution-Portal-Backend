import { Router } from 'express';
import Notification_management1Controller from './notification_management1.controller.js';

const router = Router();
const notification_management1Controller = new Notification_management1Controller();

router.get('/', notification_management1Controller.getAll);
router.post('/send', notification_management1Controller.sendNotification);

export default router;
