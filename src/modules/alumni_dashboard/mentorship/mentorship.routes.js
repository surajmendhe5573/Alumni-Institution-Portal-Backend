import { Router } from 'express';
import MentorshipController from './mentorship.controller.js';

const router = Router();
const mentorshipController = new MentorshipController();

router.put("/become-mentor", mentorshipController.becomeMentor);
router.get("/find", mentorshipController.findMentors);
router.post("/connect", mentorshipController.connect);
router.get("/requests/:mentorId", mentorshipController.getPendingRequests);
router.put("/respond/:id", mentorshipController.respond);
router.get("/connections/:userId", mentorshipController.getConnections);

export default router;
