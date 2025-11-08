import { Router } from 'express';
import Approval_workflowController from './approval_workflow.controller.js';

const router = Router();
const approval_workflowController = new Approval_workflowController();

router.get('/', approval_workflowController.getAll);
router.post('/', approval_workflowController.create);
router.put('/:id', approval_workflowController.update);
router.delete('/:id', approval_workflowController.delete);

export default router;
