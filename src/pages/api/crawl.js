import axios from "axios";
import cheerio from "cheerio";
import natural from "natural";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { domain, description, minOffer, maxPagination, filterRecent } = req.body;

    try {
      const response = await axios.get(domain);
      const html = response.data;
      const $ = cheerio.load(html);

      const leads = [];
      const tokenizer = new natural.WordTokenizer();
      const descriptionTokens = tokenizer.tokenize(description.toLowerCase());

      const selectors = {
        jobTitle: "a:contains('job')",
        jobDescription: "p:contains('description')",
        jobCompany: "a:contains('company')",
      };

      $("div:contains('Job')").each((index, element) => {
        const jobTitle = $(element).find(selectors.jobTitle).text().trim();
        const jobDescription = $(element).find(selectors.jobDescription).text().trim();
        const jobCompany = $(element).find(selectors.jobCompany).text().trim();

        const jobDescriptionTokens = tokenizer.tokenize(jobDescription.toLowerCase());
        const similarity = natural.JaroWinklerDistance(descriptionTokens.join(" "), jobDescriptionTokens.join(" "));

        if (similarity > 0.7) {
          leads.push({
            title: jobTitle,
            description: jobDescription,
            company: jobCompany,
            highlighted: true,
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