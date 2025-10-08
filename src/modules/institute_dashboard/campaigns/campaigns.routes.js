import { Router } from 'express';
import CampaignsController from './campaigns.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';

const router = Router();
const campaignsController = new CampaignsController();

router.get('/', campaignsController.getAll);

export default router;
