import { Router } from 'express';
import NewsletterController from './newsletter.controller.js';
import uploadPdf from '../../../../helpers/newsletter.upload.js';

const router = Router();
const newsletterController = new NewsletterController();

router.get("/", newsletterController.getAll);
router.post("/", uploadPdf.single("file"), newsletterController.create);

export default router;
