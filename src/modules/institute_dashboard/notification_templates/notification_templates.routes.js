import { Router } from 'express';
import Notification_templatesController from './notification_templates.controller.js';

const router = Router();
const notification_templatesController = new Notification_templatesController();

router.get('/', notification_templatesController.getAll);
router.post('/', notification_templatesController.create);
router.put('/:id', notification_templatesController.update);
router.delete('/:id', notification_templatesController.delete);

export default router;
