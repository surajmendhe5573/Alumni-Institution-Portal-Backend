import { Router } from 'express';
import ProfileController from './profile.controller.js';
import { uploadProfileImage } from '../../../helpers/profile.upload.js';

const router = Router();
const profileController = new ProfileController();

router.get("/", profileController.getAll);
router.post("/", uploadProfileImage, profileController.create);
router.get("/:id", profileController.getById);
router.delete("/:id", profileController.delete);
// router.post("/:id/become-mentor", profileController.becomeMentor);

export default router;
