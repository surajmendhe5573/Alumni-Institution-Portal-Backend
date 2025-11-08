 import { APPROVAL_WORKFLOW_MODEL } from "./approval_workflow.model.js";

 class Approval_workflowService {
   
  async create(data) {
    return await APPROVAL_WORKFLOW_MODEL.create(data);
  }

  async getAll() {
    const [total, draft, inReview, allRequests] =
      await Promise.all([
        APPROVAL_WORKFLOW_MODEL.countDocuments(),
        APPROVAL_WORKFLOW_MODEL.countDocuments({ status: "Draft" }),
        APPROVAL_WORKFLOW_MODEL.countDocuments({ status: "In Review" }),
        APPROVAL_WORKFLOW_MODEL.find().sort({ createdAt: -1 }),
      ]);

    return {
      total,
      draft,
      inReview,
      list: allRequests,
    };
  }

  async update(id, data) {
    return await APPROVAL_WORKFLOW_MODEL.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await APPROVAL_WORKFLOW_MODEL.findByIdAndDelete(id);
  }
}

export default new Approval_workflowService();
