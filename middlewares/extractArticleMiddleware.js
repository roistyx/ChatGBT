const axios = require("axios");
const cheerio = require("cheerio");

const extractArticleMiddleware = async (req, res, next) => {
  const url = req.body.url;
  try {
    console.log("Loading article content...");
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articleContent = $("article").text();

    req.articleContent = articleContent;
    console.log("req.articleContent", req.articleContent);

    return res.status(200).json({ articleContent });
    // next();
    return;
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = extractArticleMiddleware;
