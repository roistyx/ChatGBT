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
const Yahoo2FinanceController = require("./controllers/YahooFinance2Controller");
const dateValidatorMiddleware = require("./middlewares/dateFormatMiddleware");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

app.post(
  "/extract",
  extractArticleMiddleware
  // OpenAiExtractController.ExtractOpenAi
);

app.get("/stock-news/:symbol", GoogleFinanceController.getNews);
app.post("/summarize", OpenAiInquiryController.SummarizeOpenAi);

app.post(
  "/historical",
  dateValidatorMiddleware,
  YahooFinanceController.HistoricalData
);
app.get("/quote/:symbol", Yahoo2FinanceController.getQuote);

// app.use(OpenAiPromptController.PromptLine);

app.listen(3100, () => {
  console.log("Server is running on port 3100");
});
