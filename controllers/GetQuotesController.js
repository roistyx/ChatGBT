require("dotenv").config();
const axios = require("axios");

const yahooFinance2 = require("yahoo-finance2").default;

class GetQuotesController {
  static async getStockData(req, res) {
    const symbol = req.params.symbol;
    console.log("symbol", symbol);
    // try {
    //   const endpoint = `https://api.twelvedata.com/time_series?apikey=${process.env.TWELVE_DATA_API_KEY}&interval=1min&symbol=${symbol}`;
    //   const response = await axios.get(endpoint);
    //   return response.data;
    // } catch (error) {
    //   console.error("Error fetching stock data:", error);
    //   throw error;
    // }

    const API_URL = "https://api.twelvedata.com/time_series";
    const INTERVAL = "1day";
    const PREVIOUS_CLOSE = true;
    const OUTPUTSIZE = "1";

    axios
      .get(API_URL, {
        params: {
          apikey: process.env.TWELVE_DATA_API_KEY,
          interval: INTERVAL,
          symbol: symbol,
          previous_close: PREVIOUS_CLOSE,
          outputsize: OUTPUTSIZE,
        },
      })
      .then((response) => {
        const stockData = {
          symbol: response.data.meta.symbol,
          displayName: response.data.meta.symbol,
          previousClose: response.data.values[0].previous_close,
          timestamp: response.data.values[0].datetime,
        };

        res.status(200).json(stockData);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from Twelve Data API:", error);
      });
  }
  static async getQuote(req, res) {
    const symbol = req.params.symbol;
    console.log("symbol", symbol);

    try {
      const result = await yahooFinance2.quote(symbol);
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log("Error in Yahoo Finance 2", err);
    }
  }
}

module.exports = GetQuotesController;
