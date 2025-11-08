import { CAMPAIGN_MODEL } from "./campaigns.model.js";

class CampaignsService {
   
  async create(data) {
    return await CAMPAIGN_MODEL.create(data);
  }

  async getAll() {
    return await CAMPAIGN_MODEL.find();
  }

  async getById(id) {
    return await CAMPAIGN_MODEL.findById(id);
  }

  async update(id, data) {
    return await CAMPAIGN_MODEL.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return await CAMPAIGN_MODEL.findByIdAndDelete(id);
  }
}

export default new CampaignsService();
