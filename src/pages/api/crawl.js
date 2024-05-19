import axios from "axios";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { similarity } = require("ml-string-similarity");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { domain, description, minOffer, filterRecent, maxPagination } = req.body;

    try {
      const leads = [];
      let paginationCount = 0;

      const getLeadsFromPage = async (html) => {
        // Call the LLM API to parse the HTML and extract job information
        const response = await axios.post("https://api.example.com/parse-html", { html });
        const jobs = response.data.jobs;

        jobs.forEach(job => {
          const jobTitle = job.title;
          const jobDescription = job.description;
          const jobCompany = job.company;
          const jobOffer = parseFloat(job.offer.replace(/[^0-9.-]+/g, ""));
          const jobDate = new Date(job.date);

          const descriptionSimilarity = similarity(description, jobDescription);

          if (descriptionSimilarity > 0.7 && jobOffer >= minOffer) {
            leads.push({
              title: jobTitle,
              description: jobDescription,
              company: jobCompany,
              offer: jobOffer,
              date: jobDate,
              similarity: descriptionSimilarity,
            });
          }
        });
      };

      const fetchPage = async (url) => {
        const response = await axios.get(url);
        const html = response.data;
        await getLeadsFromPage(html);
        return html;
      };

      let html = await fetchPage(domain);

      while (paginationCount < maxPagination) {
        const nextPageLink = cheerio.load(html)("a.next-page").attr("href");
        if (!nextPageLink) break;
        html = await fetchPage(nextPageLink);
        paginationCount++;
      }

      if (filterRecent) {
        leads.sort((a, b) => b.date - a.date);
      }

      res.status(200).json(leads);
    } catch (error) {
      console.error("Error crawling the domain:", error);
      res.status(500).json({ error: "Error crawling the domain" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}