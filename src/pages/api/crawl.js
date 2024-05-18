import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { domain, description, threshold } = req.body;

    try {
      const response = await axios.get(domain);
      const html = response.data;
      const $ = cheerio.load(html);

      const leads = [];
      $("div.JobSearchCard-item").each((index, element) => {
        const jobTitle = $(element).find("a.JobSearchCard-primary-heading-link").text().trim();
        const jobDescription = $(element).find("p.JobSearchCard-primary-description").text().trim();
        const jobCompany = $(element).find("a.JobSearchCard-primary-subtitle-link").text().trim();

        if (jobDescription.includes(description)) {
          leads.push({
            title: jobTitle,
            description: jobDescription,
            company: jobCompany,
          });
        }
      });

      res.status(200).json(leads);
    } catch (error) {
      console.error("Error crawling the domain:", error);
      res.status(500).json({ error: "Error crawling the domain" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}