import { EVENT_MANAGEMENT_MODEL } from "./event_management.model.js"; 

 class Event_managementService {
   
  async create(data) {
    return await EVENT_MANAGEMENT_MODEL.create(data);
  }

  async getAll() {
    return await EVENT_MANAGEMENT_MODEL.find();
  }

  async getById(id) {
    return await EVENT_MANAGEMENT_MODEL.findById(id);
  }

  async update(id, data) {
    return await EVENT_MANAGEMENT_MODEL.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return await EVENT_MANAGEMENT_MODEL.findByIdAndDelete(id);
  }
}

export default new Event_managementService();
