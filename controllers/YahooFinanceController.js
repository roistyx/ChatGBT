const yahooFinance = require("yahoo-finance2").default;

class YahooFinanceController {
  static async HistoricalData(req, res) {
    const { symbol, startDate, endDate } = req.formattedObj;
    console.log("req.formattedObj", req.formattedObj);

    try {
      console.log("Searching for historical data");

      const queryOptions = {
        period1: startDate,
        period2: endDate,
        interval: "1mo",
      };

      const moduleOptions = {
        modules: ["summaryProfile", "financialData", "calendarEvents"],
      };

      const result = await yahooFinance._chart(
        symbol,
        queryOptions,
        moduleOptions
      );
      // const result = await yahooFinance.historical(symbol, queryOptions);
      // const query = "AAPL";
      // const queryOptions = { period1: "2023-05-08" /* ... */ };
      // const result = await yahooFinance._chart(query, queryOptions);

      console.log("result", result);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = YahooFinanceController;
