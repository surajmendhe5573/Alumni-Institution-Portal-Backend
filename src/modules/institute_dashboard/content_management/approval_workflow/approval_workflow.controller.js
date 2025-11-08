import Approval_workflowService from "./approval_workflow.service.js";
import { statusCode } from "../../../../utils/constants/statusCode.js";

export default class Approval_workflowController {
  constructor() {
    this.approval_workflowService = Approval_workflowService;
  }

  // 🟢 Create new workflow
  create = async (req, res, next) => {
    try {
      const result = await this.approval_workflowService.create(req.body);
      res.success("Workflow request created successfully", result, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  // 🟢 Get all workflows with stats (total, draft, in-review, approved, rejected)
  getAll = async (req, res, next) => {
    try {
      const result = await this.approval_workflowService.getAll();
      res.success("Fetched all workflow requests successfully", result, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  // 🟡 Update workflow (status, comments, etc.)
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updated = await this.approval_workflowService.update(id, req.body);

      if (!updated)
        return res.fail("Workflow not found", statusCode.NOT_FOUND);

      res.success("Workflow updated successfully", updated, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  // 🔴 Delete workflow
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.approval_workflowService.delete(id);

      if (!result)
        return res.fail("Workflow not found", statusCode.NOT_FOUND);

      res.success("Workflow deleted successfully", statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
