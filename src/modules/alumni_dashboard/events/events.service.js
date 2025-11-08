import { EVENT_MODEL } from "./events.model.js";

class EventsService {
   
  async create(data) {
    return EVENT_MODEL.create(data);
  }

  async getAll(type) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize start of day
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // end of day

    let filter = {};
    if (type === "past") filter = { eventDate: { $lt: today } };
    else if (type === "current") filter = { eventDate: { $gte: today, $lte: endOfDay } };
    else if (type === "upcoming") filter = { eventDate: { $gt: endOfDay } };

    return EVENT_MODEL.find(filter).sort({ eventDate: 1 });
  }
}

export default new EventsService();
