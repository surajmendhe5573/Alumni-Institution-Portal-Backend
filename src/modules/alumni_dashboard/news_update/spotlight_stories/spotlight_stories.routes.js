import { Router } from 'express';
import Spotlight_storiesController from './spotlight_stories.controller.js';

const router = Router();
const spotlight_storiesController = new Spotlight_storiesController();

router.get('/', spotlight_storiesController.getAll);
router.post('/', spotlight_storiesController.create);
router.put('/:id', spotlight_storiesController.update);
router.delete('/:id', spotlight_storiesController.delete);

export default router;
