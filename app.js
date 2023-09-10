require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAiInquiryController = require("./controllers/OpenAiInquiryController");
const extractArticleMiddleware = require("./middlewares/extractArticleMiddleware");
// const OpenAiPromptController = require("./controllers/OpenAiPromptController");
const OpenAiExtractController = require("./controllers/OpenAiExtractController");
const path = require("path");
const YahooFinanceController = require("./controllers/YahooFinanceController");
const GoogleFinanceController = require("./controllers/GoogleFinanceController");
const GetQuotesController = require("./controllers/GetQuotesController");
const StocksController = require("./controllers/StocksController");
const dateValidatorMiddleware = require("./middlewares/dateFormatMiddleware");
const convertToUppercaseMiddleware = require("./middlewares/convertUppercaseMiddleware");
const { InitDB } = require("./models/init.js");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

InitDB();

app.use(express.json());
app.use(express.static("public"));

app.post("/extract", extractArticleMiddleware);

app.get("/stock-news/:symbol", GoogleFinanceController.getNews);
app.post("/summarize", OpenAiInquiryController.SummarizeOpenAi);

app.post(
  "/historical",
  dateValidatorMiddleware,
  YahooFinanceController.HistoricalData
);
app.get(
  "/ticker-details/:symbol",
  convertToUppercaseMiddleware,
  GetQuotesController.getPolygonTickerDetailsV3
);
app.get(
  "/daily-open-close/:symbol/:date",
  convertToUppercaseMiddleware,
  GetQuotesController.getPolygonDailyOpenClose
);

app.post("/save-article", StocksController.saveStockNews);

// app.use(OpenAiPromptController.PromptLine);

app.listen(3100, () => {
  console.log("Server is running on port 3100");
});
