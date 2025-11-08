import { Router } from 'express';
import Alumni_dataController from './alumni_data.controller.js';
// import validate from '../../middlewares/default/validate.js';
// import rateLimiter from '../../middlewares/default/rateLimiter.js';

const router = Router();
const alumni_dataController = new Alumni_dataController();

router.post("/", alumni_dataController.create);
router.get("/", alumni_dataController.getAll);
router.get("/:id", alumni_dataController.getById);
router.put("/:id", alumni_dataController.update);
router.delete("/:id", alumni_dataController.delete);

export default router;
