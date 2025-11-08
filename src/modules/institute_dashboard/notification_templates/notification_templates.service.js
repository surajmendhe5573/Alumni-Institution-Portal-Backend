import { TEMPLATE_MODEL } from "./notification_templates.model.js"; 
 
 class Notification_templatesService {
   
async create(data) {
    return await TEMPLATE_MODEL.create(data);
  }

  async getAll(query) {
    const { category, search } = query;
    const filter = {};

    if (category) filter.category = category;
    if (search)
      filter.title = { $regex: search, $options: "i" };

    return await TEMPLATE_MODEL.find(filter).sort({ createdAt: -1 });
  }

  async update(id, data) {
    return await TEMPLATE_MODEL.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await TEMPLATE_MODEL.findByIdAndDelete(id);
  }
}


export default new Notification_templatesService();
