import { Router } from 'express';
import AnnouncementsController from './announcements.controller.js';

const router = Router();
const announcementsController = new AnnouncementsController();

router.get('/', announcementsController.getAll);
router.post('/', announcementsController.create);
router.put('/:id', announcementsController.update);
router.delete('/:id', announcementsController.delete);

export default router;
