const yahooFinance = require("yahoo-finance2").default;

class YahooFinanceController {
  static HistoricalData(req, res) {
    const { symbol, startDate, endDate } = req.formattedObj;
    console.log("req.formattedObj", req.formattedObj);

    const queryOptions = {
      period1: startDate,
      period2: endDate,
      interval: "1mo",
    };

    const moduleOptions = {
      modules: ["summaryProfile", "financialData", "calendarEvents"],
    };

    console.log("Searching for historical data");

    yahooFinance
      ._chart(symbol, queryOptions, moduleOptions)
      .then((result) => {
        console.log("result", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = YahooFinanceController;
