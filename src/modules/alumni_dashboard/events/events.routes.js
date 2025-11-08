import { Router } from 'express';
import EventsController from './events.controller.js';

const router = Router();
const eventsController = new EventsController();

router.post('/', eventsController.create);
router.get('/', eventsController.getAll);

export default router;
