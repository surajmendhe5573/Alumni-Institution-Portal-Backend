import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
     host: process.env.MAIL_HOST, // e.g., smtp.gmail.com
     port: Number(process.env.MAIL_PORT), // 587 (TLS) or 465 (SSL)
     secure: process.env.MAIL_SECURE === 'true', // true for 465, false for 587
     auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
     },
});

transporter.verify((error, success) => {
     if (error) {
          console.error('Mail server connection failed:', error);
     } else {
          console.log('Mail server is ready to take messages');
     }
});


export class MailService {
     constructor() {
          this.transporter = transporter;
          this.from = `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USER}>`;
     }

     async sendMail({ to, subject, html, text }) {
          try {
               if (!to || !subject || (!html && !text)) {
                    throw new Error('Missing required fields: to, subject, and html/text content');
               }

               const info = await this.transporter.sendMail({
                    from: this.from,
                    to,
                    subject,
                    text,
                    html,
               });

               return {
                    success: true,
                    messageId: info.messageId,
                    response: info.response,
               };
          } catch (error) {
               console.error('Error sending email:', error);
               throw new Error('Failed to send email');
          }
     }
}
