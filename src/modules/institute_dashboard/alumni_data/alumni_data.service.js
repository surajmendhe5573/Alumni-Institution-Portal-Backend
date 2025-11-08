import { ALUMNI_DATA_MODEL } from "./alumni_data.model.js";

class Alumni_dataService {

  async create(data) {
    return await ALUMNI_DATA_MODEL.create(data);
  }

  async getAll(query) {
    const { batch, department, search } = query;
    const filter = {};

    if (batch) filter.batch = batch;
    if (department) filter.department = department;
    if (search) filter.name = { $regex: search, $options: "i" };

    const alumni = await ALUMNI_DATA_MODEL.find(filter).sort({ createdAt: -1 });
    return alumni;
  }

  async getById(id) {
    return await ALUMNI_DATA_MODEL.findById(id);
  }

  async update(id, data) {
    const alumni = await ALUMNI_DATA_MODEL.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return alumni;
  }

  async delete(id) {
    return await ALUMNI_DATA_MODEL.findByIdAndDelete(id);
  }
}

export default new Alumni_dataService();
