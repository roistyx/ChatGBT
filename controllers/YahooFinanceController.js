const yahooFinance = require("yahoo-finance");

class YahooFinanceController {
  static HistoricalData(req, res) {
    const { symbol, startDate, endDate } = req.formattedObj;
    console.log("req.formattedObj", req.formattedObj);

    try {
      yahooFinance
        .historical({
          symbol: symbol,
          from: startDate,
          to: endDate,
        })
        .then((result) => {
          console.log("result", result);
          res.status(200).json(result);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = YahooFinanceController;
