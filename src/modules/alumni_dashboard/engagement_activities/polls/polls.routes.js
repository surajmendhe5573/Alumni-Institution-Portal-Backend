import { Router } from 'express';
import PollsController from './polls.controller.js';

const router = Router();
const pollsController = new PollsController();

router.post("/", pollsController.createPoll);
router.get("/", pollsController.getAllPolls);
router.post("/vote", pollsController.submitVote);
router.get("/:pollId", pollsController.getPollResults); 


export default router;
