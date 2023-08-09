require("dotenv").config();
const axios = require("axios");
const yahooFinance2 = require("yahoo-finance2").default;

class GoogleFinanceController {
  static async getNews(req, res) {
    const symbol = req.params.symbol;
    const API_KEY = process.env.GOOGLE_API_KEY;
    let quote = {};

    const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&sort=LATEST&tickers=${symbol}&apikey=${API_KEY}}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;

        const feed = data.feed.slice(0, 33);

        res.status(200).json({ feed: feed, quote: quote });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  }
}

module.exports = GoogleFinanceController;
