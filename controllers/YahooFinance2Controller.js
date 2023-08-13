require("dotenv").config();
const axios = require("axios");
const yahooFinance2 = require("yahoo-finance2").default;

class Yahoo2FinanceController {
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

module.exports = Yahoo2FinanceController;
