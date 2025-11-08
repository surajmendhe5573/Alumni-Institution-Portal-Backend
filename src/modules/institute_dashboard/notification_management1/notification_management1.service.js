import { ALUMNI_DATA_MODEL } from "../alumni_data/alumni_data.model.js";
import { TEMPLATE_MODEL } from "../notification_templates/notification_templates.model.js";
import { NOTIFICATION_MODEL1 } from "./notification_management1.model.js"; 
import nodemailer from "nodemailer";
 
 class Notification_management1Service {
   
async sendNotification(data) {
    const { recipients, subject, bodyContent, batch, templateId } = data;

    // ✅ Step 1: Get template if provided
    let finalSubject = subject;
    let finalBody = bodyContent;

    if (templateId) {
      const template = await TEMPLATE_MODEL.findById(templateId);
      if (template) {
        finalSubject = template.subject;
        finalBody = template.body;
      }
    }

    // ✅ Step 2: Filter alumni based on recipients
    const filter = {};
    if (recipients === "Batch-wise" && batch) filter.batch = batch;
    filter.email = { $exists: true, $ne: "" };

    const alumniList = await ALUMNI_DATA_MODEL.find(filter);
    if (!alumniList.length) {
      throw new Error("No alumni found with valid email addresses for the selected recipients");
    }

    // ✅ Step 3: Configure mail transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let sentCount = 0;

    // ✅ Step 4: Send emails to each alumni
    for (const alumni of alumniList) {
      const email = alumni.email?.trim();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) continue;

      // Extract first name from alumni.name
      const firstName = alumni.name?.split(" ")[0] || "Alumni";

      // Replace placeholders dynamically
      const personalizedBody = finalBody
        .replace(/\[First Name\]/g, firstName)
        .replace(/\[Institute Name\]/g, "Your Institute Name")
        .replace(/\[Campaign Name\]/g, "Our Alumni Campaign")
        .replace(/\[Donation Link\]/g, "https://example.com/donate");

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: finalSubject.replace(/\[First Name\]/g, firstName),
          text: personalizedBody,
          html: `<p>${personalizedBody.replace(/\n/g, "<br>")}</p>`,
        });
        sentCount++;
      } catch (err) {
        console.error(`Failed to send email to ${email}:`, err.message);
      }
    }

    // ✅ Step 5: Save notification log
    const notification = await NOTIFICATION_MODEL1.create({
      recipients,
      subject: finalSubject,
      bodyContent: finalBody,
      batch,
      templateId,
      sentCount,
      status: sentCount > 0 ? "Sent" : "Failed",
    });

    return notification;
  }

  // 📜 GET ALL NOTIFICATIONS
  async getAll() {
    const notifications = await NOTIFICATION_MODEL1.find()
      .populate("templateId", "title category")
      .sort({ createdAt: -1 });

    return notifications.map((n) => ({
      _id: n._id,
      subject: n.subject,
      message: n.bodyContent,
      targetAudience:
        n.recipients === "All Alumni" ? "All Alumni" : `Batch ${n.batch}`,
      templateUsed: n.templateId ? n.templateId.title : "Custom Message",
      status: n.status,
      sentCount: n.sentCount,
      createdAt: n.createdAt,
    }));
  }
}

export default new Notification_management1Service();
