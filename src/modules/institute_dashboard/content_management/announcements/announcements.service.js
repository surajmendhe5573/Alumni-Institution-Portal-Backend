import { ANNOUNCEMENT_MODEL } from "./announcements.model.js";

class AnnouncementsService {
  async create(data) {

    // if (data.endDate && new Date(data.endDate) < new Date()) {  // If current date > endDate => Expired, else => Active
    //   data.status = "Expired";
    // } else {
    //   data.status = "Active";
    // }
      if (data.endDate && new Date() > new Date(data.endDate).setHours(23, 59, 59, 999)) {
        data.status = "Expired";
      } else {
      data.status = "Active";
    }

    return await ANNOUNCEMENT_MODEL.create(data);
  }

  async getAll() {
    const announcements = await ANNOUNCEMENT_MODEL.find().sort({ createdAt: -1 });;

    const totalAnnouncements = await ANNOUNCEMENT_MODEL.countDocuments();
    const activeAnnouncements = await ANNOUNCEMENT_MODEL.countDocuments({ status: "Active" });
    const expiredAnnouncements = await ANNOUNCEMENT_MODEL.countDocuments({ status: "Expired" });

    return {
      stats: {
        totalAnnouncements,
        activeAnnouncements,
        expiredAnnouncements,
      },
      data: announcements,
    };
  }

  async update(id, data) {

    // if (data.endDate && new Date(data.endDate) < new Date()) {
    //   data.status = "Expired";
    // } else {
    //   data.status = "Active";
    // }
    if (data.endDate && new Date() > new Date(data.endDate).setHours(23, 59, 59, 999)) {
     data.status = "Expired";
    } else {
      data.status = "Active";
    }

    return await ANNOUNCEMENT_MODEL.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await ANNOUNCEMENT_MODEL.findByIdAndDelete(id);
  }
}

export default new AnnouncementsService();
