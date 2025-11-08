import { SPOTLIGHT_STORY_MODEL } from "./spotlight_stories.model.js"; 
 
 class Spotlight_storiesService {

  async getAll() {
    return await SPOTLIGHT_STORY_MODEL.find().sort({ createdAt: -1 });
  }

  async create(data) {
    return await SPOTLIGHT_STORY_MODEL.create(data);
  }

  async getById(id) {
    return await SPOTLIGHT_STORY_MODEL.findById(id);
  }

  async update(id, data) {
    return await SPOTLIGHT_STORY_MODEL.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return await SPOTLIGHT_STORY_MODEL.findByIdAndDelete(id);
  }

}

export default new Spotlight_storiesService();
