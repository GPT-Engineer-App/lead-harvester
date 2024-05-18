import axios from "axios";
import cheerio from "cheerio";
import nodemailer from "nodemailer";

const fetchLeads = async (domain, threshold) => {
  try {
    const response = await axios.get(domain);
    const $ = cheerio.load(response.data);
    const leads = [];

    $("a").each((index, element) => {
      const email = $(element).attr("href");
      if (email && email.startsWith("mailto:")) {
        leads.push({ email: email.replace("mailto:", "") });
      }
    });

    return leads.slice(0, threshold);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
};

const sendEmails = async (leads, emailConfig) => {
  const transporter = nodemailer.createTransport(emailConfig);

  for (const lead of leads) {
    const mailOptions = {
      from: emailConfig.auth.user,
      to: lead.email,
      subject: "Lead Generation",
      text: "This is a customizable email content.",
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
};

export { fetchLeads, sendEmails };