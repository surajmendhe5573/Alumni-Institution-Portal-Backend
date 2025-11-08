import { Router } from 'express';
import Analytics_reportsController from './analytics_reports.controller.js';

const router = Router();
const analytics_reportsController = new Analytics_reportsController();

router.get("/event-participation-trends", analytics_reportsController.getEventParticipationTrends);

export default router;
