import { Router } from 'express';
import Alumni_dataController from './alumni_data.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';

const router = Router();
const alumni_dataController = new Alumni_dataController();

router.get('/', alumni_dataController.getAll);

export default router;
