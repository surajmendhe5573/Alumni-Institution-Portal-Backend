import { Router } from 'express';
import Event_managementController from './event_management.controller.js';
// import validate from '../../middlewares/default/validate.js';
// import rateLimiter from '../../middlewares/default/rateLimiter.js';

const router = Router();
const event_managementController = new Event_managementController();

router.post("/", event_managementController.create);
router.get("/", event_managementController.getAll);
router.get("/:id", event_managementController.getById);
router.put("/:id", event_managementController.update);
router.delete("/:id", event_managementController.delete);

export default router;
