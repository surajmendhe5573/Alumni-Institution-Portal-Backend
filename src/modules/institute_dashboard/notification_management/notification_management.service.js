import nodemailer from "nodemailer";
import { NOTIFICATION_MODEL } from "./notification_management.model.js";
import { ALUMNI_DATA_MODEL } from "../alumni_data/alumni_data.model.js";
import dotenv from "dotenv";

dotenv.config();

class Notification_managementService {
  // async sendNotification(data) {
  //   const { recipients, subject, bodyContent, batch } = data;

  //   const filter = {};
  //   if (batch) filter.batch = batch;
    
  //   const alumniList = await ALUMNI_DATA_MODEL.find(filter);

  //   if (!alumniList.length) {
  //     throw new Error("No alumni found for the selected filters");
  //   }

  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.EMAIL_USER,
  //       pass: process.env.EMAIL_PASS,
  //     },
  //   });

  //   let sentCount = 0;

  //   for (const alumni of alumniList) {
  //     if (alumni.email) {
  //       try {
  //         await transporter.sendMail({
  //           from: process.env.EMAIL_USER,
  //           to: alumni.email,
  //           subject: subject,
  //           text: bodyContent,
  //           html: `<p>${bodyContent}</p>`,
  //         });
  //         sentCount++;
  //       } catch (err) {
  //         console.error(`Failed to send email to ${alumni.email}:`, err.message);
  //       }
  //     }
  //   }

  //   const notification = await NOTIFICATION_MODEL.create({
  //     recipients,
  //     subject,
  //     bodyContent,
  //     batch,
  //     sentCount,
  //     status: sentCount > 0 ? "Sent" : "Failed",
  //   });

  //   return notification;
  // }

  async sendNotification(data) {
    const { recipients, subject, bodyContent, batch } = data;

    // Build filter condition
    const filter = {};
    if (batch) filter.batch = batch;

    // Only select alumni with valid, non-empty emails
    filter.email = { $exists: true, $ne: "" };

    // Fetch alumni
    const alumniList = await ALUMNI_DATA_MODEL.find(filter);

    if (!alumniList.length) {
      throw new Error("No alumni found with valid email addresses for the selected batch");
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let sentCount = 0;

    // Send email to each alumni with a valid email
    for (const alumni of alumniList) {
      const email = alumni.email?.trim();

      // Simple email format validation
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) continue;

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject,
          text: bodyContent,
          html: `<p>${bodyContent}</p>`,
        });
        sentCount++;
      } catch (err) {
        console.error(`Failed to send email to ${email}:`, err.message);
      }
    }

    // Save notification summary in DB
    const notification = await NOTIFICATION_MODEL.create({
      recipients,
      subject,
      bodyContent,
      batch,
      sentCount,
      status: sentCount > 0 ? "Sent" : "Failed",
    });

    return notification;
  }

  async getAll() {
    const notifications = await NOTIFICATION_MODEL.find().sort({ createdAt: -1 });

    const formatted = notifications.map(n => {
      let targetAudience = "";

      switch (n.recipients) {
        case "All Alumni":
          targetAudience = "All Alumni";
          break;
        case "Batch-wise":
          targetAudience = `Batch ${n.batch}`;
          break;
        default:
          targetAudience = "Unknown";
      }

      return {
        _id: n._id,
        subject: n.subject,
        message: n.message || n.bodyContent,
        targetAudience,
        status: n.status,
        sentCount: n.sentCount,
        createdAt: n.createdAt,
      };
    });

    return formatted;
  }
}

export default new Notification_managementService();
