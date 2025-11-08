import { NEWSLETTER_MODEL } from "./newsletter.model.js";

 class NewsletterService {
   
  async getAll() {
    const newsletters = await NEWSLETTER_MODEL.find().sort({ createdAt: -1 });
    return newsletters;
  }

  async create(data) {
    const newsletter = await NEWSLETTER_MODEL.create(data);
    return newsletter;
  }
}

export default new NewsletterService();
