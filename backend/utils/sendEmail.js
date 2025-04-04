import nodemailer from "nodemailer";
import fs from "fs";

class Email {
  constructor(user, data) {
    this.to = user.email;
    this.full_name = user.full_name;
    this.data = data;
    this.from = `Meeting <${process.env.EMAIL_FROM}>`;
  }
  createNewTransport() {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    return transporter;
  }

  async sendZoomUrl() {
    let template = fs.readFileSync(
      "./views/email_template/sendZoomUrl.html",
      "utf-8"
    );
    const replacements = {
      name: this.full_name,
      zoomLink: this.data.zoom_url,
      meetingTopic: this.data.topic,
      scheduledTime: this.data.start_time,
    };
    Object.keys(replacements).forEach((key) => {
      const value = replacements[key];
      template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
    });
    await this.send(template, `Meeting (${this.data.topic})`);
  }
  async send(html, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // Send the email
    await this.createNewTransport().sendMail(mailOptions);
  }
}
export default Email;
