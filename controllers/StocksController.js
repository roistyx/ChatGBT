const StockDao = require("../models/StockNewsDao.js");

class StocksController {
  static async saveStockNews(req, res) {
    // console.log("req.body", req.body);
    try {
      const result = await StockDao.createNewsEntry(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("Something went wrong", err);
    }
  }
}

module.exports = StocksController;
