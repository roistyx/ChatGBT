const yahooFinance = require("yahoo-finance");

class YahooFinanceController {
  static async HistoricalData(req, res) {
    console.log("contoller", req.body);
    // const symbol = "AAPL"; // Replace with the desired stock symbol
    // const startDate = "2023-07-29"; // Replace with the desired start date (YYYY-MM-DD)
    // const endDate = "2023-07-31";

    // yahooFinance.historical(
    //   {
    //     symbol: symbol,
    //     from: startDate,
    //     to: endDate,
    //   },
    //   (err, quotes) => {
    //     if (err) {
    //       console.error("Error fetching historical data:", err);
    //     } else {
    //       console.log("Historical data for", symbol, ":", quotes);
    //     }
    //   }
    // );
  }
}

module.exports = YahooFinanceController;
