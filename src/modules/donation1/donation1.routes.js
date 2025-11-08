import { Router } from 'express';
import Donation1Controller from './donation1.controller.js';
// import validate from '../../middlewares/default/validate.js';
// import rateLimiter from '../../middlewares/default/rateLimiter.js';

const router = Router();
const donation1Controller = new Donation1Controller();

router.post("/create-order", donation1Controller.createOrder);
router.post("/verify-payment", donation1Controller.verifyPayment);

export default router;
