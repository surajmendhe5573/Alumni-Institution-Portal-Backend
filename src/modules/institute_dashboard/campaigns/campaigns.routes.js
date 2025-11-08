import { Router } from 'express';
import CampaignsController from './campaigns.controller.js';
// import validate from '../../middlewares/default/validate.js';
// import rateLimiter from '../../middlewares/default/rateLimiter.js';

const router = Router();
const campaignsController = new CampaignsController();

router.post("/", campaignsController.create);
router.get("/", campaignsController.getAll);
router.get("/:id", campaignsController.getById);
router.put("/:id", campaignsController.update);
router.delete("/:id", campaignsController.delete);

export default router;
