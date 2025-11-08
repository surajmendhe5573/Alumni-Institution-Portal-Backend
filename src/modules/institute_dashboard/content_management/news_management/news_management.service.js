import { NEWS_MANAGEMENT_MODEL } from "./news_management.model.js"; 

class News_managementService {
   
  async create(data) {
    return await NEWS_MANAGEMENT_MODEL.create(data);
  }

  async getAll() {
    const newsList = await NEWS_MANAGEMENT_MODEL.find();
    const total = await NEWS_MANAGEMENT_MODEL.countDocuments();
    const published = await NEWS_MANAGEMENT_MODEL.countDocuments({ status: "Published" });
    const drafts = await NEWS_MANAGEMENT_MODEL.countDocuments({ status: "Draft" });

    return {
      stats: { total, published, drafts },
      data: newsList,
    };
  }

  async update(id, data) {
    return await NEWS_MANAGEMENT_MODEL.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await NEWS_MANAGEMENT_MODEL.findByIdAndDelete(id);
  }
}

export default new News_managementService();
