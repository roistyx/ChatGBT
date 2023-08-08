require("dotenv").config();
const axios = require("axios");

class GoogleFinanceController {
  static async getNews(req, res) {
    const symbol = req.params.symbol;

    const API_KEY = process.env.GOOGLE_API_KEY;

    const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&sort=LATEST&tickers=${symbol}&apikey=${API_KEY}}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;

        const feed = data.feed.slice(0, 10);
        const summaryArray = data.feed.forEach((item) => {
          summaryArray.push(item.summary);
        });
        console.log("summaryArray", summaryArray);

        res.status(200).json({ feed: feed });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
        }
      });
  }
}

module.exports = GoogleFinanceController;
