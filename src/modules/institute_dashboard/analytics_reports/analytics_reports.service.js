 import { EVENT_MANAGEMENT_MODEL } from "../event_management/event_management.model.js";
 
 class Analytics_reportsService { 

  async getEventParticipationTrends(year) {
    const selectedYear = year || new Date().getFullYear();

    const trends = await EVENT_MANAGEMENT_MODEL.aggregate([
      {
        $match: {
          eventDate: {
            $gte: new Date(`${selectedYear}-01-01`),
            $lte: new Date(`${selectedYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { 
            month: { $month: "$eventDate" }, 
            status: "$status" 
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          statuses: {
            $push: {
              status: "$_id.status",
              count: "$count",
            },
          },
          total: { $sum: "$count" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format response for chart
    const formatted = Array.from({ length: 12 }, (_, i) => {
      const monthData = trends.find((t) => t._id === i + 1);
      return {
        month: new Date(0, i).toLocaleString("en", { month: "short" }),
        Active:
          monthData?.statuses.find((s) => s.status === "Active")?.count || 0,
        Draft:
          monthData?.statuses.find((s) => s.status === "Draft")?.count || 0,
        Inactive:
          monthData?.statuses.find((s) => s.status === "Inactive")?.count || 0,
        total: monthData?.total || 0,
      };
    });

    return formatted;
  }
}

export default new Analytics_reportsService();
