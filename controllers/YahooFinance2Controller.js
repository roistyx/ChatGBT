require("dotenv").config();
const axios = require("axios");
const yahooFinance2 = require("yahoo-finance2").default;

class Yahoo2FinanceController {
  static async getQuote(req, res) {
    const symbol = req.params.symbol;

    try {
      const result = await yahooFinance2.quote(symbol);
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Yahoo2FinanceController;
