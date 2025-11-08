import { Router } from 'express';
import DonationController from './donation.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';

const router = Router();
const donationController = new DonationController();

router.post("/create-order", donationController.createOrder);
router.post("/generate-signature", donationController.generateSignature);
router.post("/verify-payment", donationController.verifyPayment);

export default router;
