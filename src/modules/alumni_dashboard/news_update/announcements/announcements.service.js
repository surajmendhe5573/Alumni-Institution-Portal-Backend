import { ANNOUNCEMENT_MODEL } from "./announcements.model.js"; 
 
 class AnnouncementsService {

  async getAll() {
    return await ANNOUNCEMENT_MODEL.find().sort({ createdAt: -1 });
  }

  async create(data) {
    return await ANNOUNCEMENT_MODEL.create(data);
  }

  async update(id, data) {
    return await ANNOUNCEMENT_MODEL.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return await ANNOUNCEMENT_MODEL.findByIdAndDelete(id);
  }
}

export default new AnnouncementsService();
