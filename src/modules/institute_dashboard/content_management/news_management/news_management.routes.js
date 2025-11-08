import { Router } from 'express';
import News_managementController from './news_management.controller.js';
import validate from '../../../../middlewares/default/validate.js';
import rateLimiter from '../../../../middlewares/default/rateLimiter.js';

const router = Router();
const news_managementController = new News_managementController();

router.get("/", news_managementController.getAll);
router.post("/", news_managementController.create);
router.put("/:id", news_managementController.update);
router.delete("/:id", news_managementController.delete);

export default router;