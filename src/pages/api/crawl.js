import axios from "axios";
import cheerio from "cheerio";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { similarity } = require("ml-string-similarity");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { domain, description, minOffer, filterRecent, maxPagination } = req.body;

    try {
      const leads = [];
      let paginationCount = 0;

      const getLeadsFromPage = ($) => {
        $("div.JobSearchCard-item").each((index, element) => {
          const jobTitle = $(element).find("a.JobSearchCard-primary-heading-link").text().trim();
          const jobDescription = $(element).find("p.JobSearchCard-primary-description").text().trim();
          const jobCompany = $(element).find("a.JobSearchCard-primary-subtitle-link").text().trim();
          const jobOffer = parseFloat($(element).find("span.JobSearchCard-primary-offer").text().trim().replace(/[^0-9.-]+/g, ""));
          const jobDate = new Date($(element).find("time.JobSearchCard-primary-date").attr("datetime"));

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
        const $ = cheerio.load(html);
        getLeadsFromPage($);
        return $;
      };

      let $ = await fetchPage(domain);

      while (paginationCount < maxPagination) {
        const nextPageLink = $("a.next-page").attr("href");
        if (!nextPageLink) break;
        $ = await fetchPage(nextPageLink);
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